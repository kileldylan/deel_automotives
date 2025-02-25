import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button
} from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ExploreAllcars = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        let { data, error } = await supabase.from('cars').select('*');
        if (error) throw error;
        setCarData(data);
        setFilteredCars(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, []);

  const handleFilterChange = () => {
    let filtered = carData;
    if (typeFilter) filtered = filtered.filter(car => car.type === typeFilter);
    if (priceFilter) {
      switch (priceFilter) {
        case '0-500K':
          filtered = filtered.filter(car => car.price <= 500000);
          break;
        case '500K-1M':
          filtered = filtered.filter(car => car.price > 500000 && car.price <= 1000000);
          break;
        case '1M-2M':
          filtered = filtered.filter(car => car.price > 1000000 && car.price <= 2000000);
          break;
        case '2M-3M':
          filtered = filtered.filter(car => car.price > 2000000 && car.price <= 3000000);
          break;
        case '3M-5M':
          filtered = filtered.filter(car => car.price > 3000000 && car.price <= 5000000);
          break;
        case '5M-10M':
          filtered = filtered.filter(car => car.price > 5000000 && car.price <= 10000000);
          break;
        case '10M+':
          filtered = filtered.filter(car => car.price > 10000000);
          break;
        default:
          break;
      }
    }
    if (colorFilter) filtered = filtered.filter(car => car.color === colorFilter);
    if (yearFilter) filtered = filtered.filter(car => car.year === parseInt(yearFilter));
    setFilteredCars(filtered);
  };

  if (loading) return <CircularProgress />;

  const handleCardClick = (id) => {
    navigate(`/carRoutes/cars/${id}`);
  };

  return (
    <>
      <CustomAppBar />
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>All cars</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ bgcolor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Filter Options</Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Vehicle Type</InputLabel>
                <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  <MenuItem value="Sedan">Sedan</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Truck">Truck</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Supercar">Supercar</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Price Range</InputLabel>
                <Select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  <MenuItem value="0-500K">0-500K</MenuItem>
                  <MenuItem value="500K-1M">500K-1M</MenuItem>
                  <MenuItem value="1M-2M">1M-2M</MenuItem>
                  <MenuItem value="2M-3M">2M-3M</MenuItem>
                  <MenuItem value="3M-5M">3M-5M</MenuItem>
                  <MenuItem value="5M-10M">5M-10M</MenuItem>
                  <MenuItem value="10M+">10M+</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Color</InputLabel>
                <Select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  <MenuItem value="Red">Red</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="White">White</MenuItem>
                  <MenuItem value="Silver">Silver</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Year</InputLabel>
                <Select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                </Select>
              </FormControl>
              <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleFilterChange}>
                Apply Filters
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {filteredCars.map(car => (
                <Grid item xs={12} sm={6} md={4} key={car.id}>
                  <Card sx={{ width: 300, cursor: 'pointer' }} onClick={() => handleCardClick(car.id)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.image_url}
                      alt={car.make}
                    />
                    <CardContent>
                      <Typography variant="h6">{car.make}</Typography>
                      <Typography variant="subtitle1">{car.model} - {car.color}</Typography>
                      <Typography color="text.secondary">Year: {car.year}</Typography>
                      <Typography color="text.secondary">Price: Ksh {car.price.toLocaleString()}</Typography>
                      <Typography variant="body2" color="text.secondary">{car.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </>
  );
};

export default ExploreAllcars;