import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  Grid,
  TextField,
  Box,
  Card,
  CircularProgress,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import CustomAppBar from './customAppbar';
import Footer from './footer';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import carHeroImage from '../images/porsche_banner.jpg';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [carData, setCarData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const availableCarsRef = useRef(null);
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(12);

  const fetchCarData = async () => {
    try {
      const { data, error } = await supabase.from('cars').select('*');
      if (error) throw error;
      setCarData(data);
      setFilteredCars(data);
      setDisplayCount(12);
    } catch (error) {
      console.error('Error fetching car data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarData();
    const intervalId = setInterval(fetchCarData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let filtered = carData;
    if (priceFilter) {
      filtered = filtered.filter(car => {
        switch (priceFilter) {
          case '0-500K': return car.price <= 500000;
          case '500K-1M': return car.price > 500000 && car.price <= 1000000;
          case '1M-2M': return car.price > 1000000 && car.price <= 2000000;
          case '2M-3M': return car.price > 2000000 && car.price <= 3000000;
          case '3M-5M': return car.price > 3000000 && car.price <= 5000000;
          case '5M-10M': return car.price > 5000000 && car.price <= 10000000;
          case '10M+': return car.price > 10000000;
          default: return true;
        }
      });
    }
    if (searchQuery) {
      filtered = filtered.filter(car => car.make.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredCars(filtered);
  }, [priceFilter, searchQuery, carData]);

  if (loading) return <CircularProgress />;
  return (
    <>
      <CustomAppBar />
      <Box sx={{ backgroundColor: '#e0f7fa', padding: 3, textAlign: 'center' }}>
        <Typography variant="h4">Welcome to Wahome Automotive!</Typography>
      </Box>
      <Box sx={{ position: 'relative', height: '400px' }}>
        <img src={carHeroImage} alt="Hero Car" style={{ width: '100%', height: '100%' }} />
      </Box>
      <Container>
        <Grid container spacing={4}>
          {filteredCars.slice(0, displayCount).map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${supabaseUrl}/storage/v1/object/public/vehicle-images/${car.image_url}`}
                  alt={car.model}
                />
                <CardContent>
                  <Typography variant="h5">{car.make} {car.model}</Typography>
                  <Typography variant="h6" color="text.secondary">Ksh {car.price.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;