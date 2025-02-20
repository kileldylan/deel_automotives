import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, IconButton, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import Footer from './footer';
import CustomAppBar from './customAppbar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const navigate = useNavigate();
  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement search logic here
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 6);
  };

  const handleCardClick = (id) => {
    navigate(`/carRoutes/cars/${id}`);
  };

  const handleCallNow = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

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
              <Card sx={{ width: '100%', cursor: 'pointer' }} onClick={() => handleCardClick(car.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={car.image_url}
                  alt={car.model}
                />
                <CardContent>
                  <Typography variant="h7">{car.make} {car.model} {car.description}</Typography>
                  <Typography variant="h6" color="text.secondary">Ksh {car.price.toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {[...Array(5)].map((_, index) => (
                      <StarIcon key={index} sx={{ color: index < car.rating ? '#ffb400' : '#e0e0e0' }} />
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleCallNow('+254758715788')} // Replace with actual contact number
                  >
                    Call Now
                  </Button>
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