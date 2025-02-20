import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Box,
  Card,
  CircularProgress,
  CardContent,
  CardMedia,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createClient } from '@supabase/supabase-js';
import CustomAppBar from './customAppbar';
import Footer from './footer';
import carHeroImage from '../images/porsche_banner.jpg';
import { Link } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [carData, setCarData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);
  const availableCarsRef = useRef(null);
  const navigate = useNavigate();
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

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 12);
  };

  const scrollToAvailableCars = () => {
    if (availableCarsRef.current) {
      availableCarsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleCardClick = (id) => {
    navigate(`/carRoutes/cars/${id}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  if (loading) return <CircularProgress />;
  
  return (
    <>
      <CustomAppBar />
      <Box sx={{ backgroundColor: '#e0f7fa', padding: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
          Welcome to Deel Automotive!
        </Typography>
        <Typography variant="h6" sx={{ color: '#004d40', fontFamily: 'Roboto, sans-serif', mt: 1 }}>
          Discover premium vehicles and unmatched quality – because you deserve the best on the road.
        </Typography>
        <Typography variant="body1" sx={{ color: '#00695c', mt: 2, fontFamily: 'Arial, sans-serif' }}>
          Located at the heart of Thika Town, 123 Oginga St, we’re here to bring you closer to your dream ride.
        </Typography>
        <Typography variant="body1" sx={{ color: '#00796b', mt: 1, fontFamily: 'Arial, sans-serif' }}>
          Have questions?{' '}
          <Link to="/contact" style={{ color: '#004d40', fontWeight: 'bold', textDecoration: 'underline' }}>
            Contact Us
          </Link>{' '}
          and let’s get you on the road to a perfect drive!
        </Typography>
      </Box>

      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: '400px', overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <img
          src={carHeroImage}
          alt="Hero Car"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            Drive Your Dream
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: 15,
              px: 4,
              py: 1.5,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: '#ff8a65',
              },
            }}
            onClick={scrollToAvailableCars}
          >
            Explore Our Collection
          </Button>
        </Box>
      </Box>

      {/* Search and Filter */}
      <Container sx={{ marginTop: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <form onSubmit={handleSearchSubmit}>
            <TextField
                variant="outlined"
                placeholder="Search for by car name..."
                sx={{
                    width: {
                        xs: '100%', // Full width on extra small screens
                        sm: '400px', // 400px width on small screens
                        md: '600px', // 600px width on medium screens and above
                    },
                    marginRight: { xs: 0, sm: 1 }, // No margin on extra small screens
                    marginBottom: { xs: 2, sm: 0 }, // Add margin bottom on extra small screens
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton type="submit">
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
          </form>
        </Box>
      </Container>

      {/* Price Range Filter */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: -2 }}>
          Price Range
        </Typography>
        {['0-500K', '500K-1M', '1M-2M', '2M-3M', '3M-5M', '5M-10M', '10M+'].map((range) => (
          <Button
            key={range}
            variant={priceFilter === range ? 'contained' : 'outlined'}
            onClick={() => setPriceFilter(range)}
          >
            {range}
          </Button>
        ))}
      </Box>
        
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          {filteredCars.slice(0, displayCount).map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card sx={{ width: 300, cursor: 'pointer' }} onClick={() => handleCardClick(car.id)}>                <CardMedia
                  component="img"
                  height="140"
                  image={car.image_url} 
                  alt={car.model}
                />
                <CardContent>
                  <Typography variant="h7">{car.make} {car.model} {car.description}</Typography>
                  <Typography variant="h6" color="text.secondary">Ksh {car.price.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {displayCount < filteredCars.length && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Button variant="contained" onClick={handleLoadMore}>Load More</Button>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Home;