// ExploreCars.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, CircularProgress } from '@mui/material';
import CustomAppBar from './customAppbar';
import Footer from './footer';

const ExploreCars = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch car data from the API
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carRoutes/cars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCarData();

    // Smooth scrolling to section based on URL
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  if (loading) {
    return <CircularProgress />; // Loading indicator
  }

  return (
    <>
      <CustomAppBar />
      <Container sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004d40' }}>
            Explore Our Collection
          </Typography>
        </Box>

        {/* Sedan Section */}
        <Box id="sedans">
          <Typography variant="h5" sx={{ mt: 4, color: '#004d40' }}>
            Sedans
          </Typography>
          <Grid container spacing={4}>
            {carData.filter(car => car.type === 'Sedan').map(car => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card>
                  <CardMedia 
                  component="img" 
                  height="200" 
                  image={`http://localhost:5000${car.image_url}`} // Ensure you prepend the base URL
                  alt={car.make}
                  />
                  <CardContent>
                  <Typography variant="h6">{car.make}</Typography>
                    <Typography variant="h6">{car.model}</Typography>
                    <Typography color="text.secondary">Price: Ksh {car.price.toLocaleString()}</Typography>
                    <Typography variant="body2" color="text.secondary">{car.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* SUV Section */}
        <Box id="suvs">
          <Typography variant="h5" sx={{ mt: 4, color: '#004d40' }}>
            SUVs
          </Typography>
          <Grid container spacing={4}>
            {carData.filter(car => car.type === 'SUV').map(car => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card>
                  <CardMedia component="img" height="200" 
                  image={`http://localhost:5000${car.image_url}`} // Ensure you prepend the base URL
                  alt={car.make} />
                  <CardContent>
                    <Typography variant="h6">{car.model}</Typography>
                    <Typography color="text.secondary">Price: ${car.price.toLocaleString()}</Typography>
                    <Typography variant="body2" color="text.secondary">{car.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Truck Section */}
        <Box id="trucks">
          <Typography variant="h5" sx={{ mt: 4, color: '#004d40' }}>
            Trucks
          </Typography>
          <Grid container spacing={4}>
            {carData.filter(car => car.type === 'Truck').map(car => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card>
                  <CardMedia component="img" height="200"
                  image={`http://localhost:5000${car.image_url}`} // Ensure you prepend the base URL
                  alt={car.make} />
                  <CardContent>
                    <Typography variant="h6">{car.model}</Typography>
                    <Typography color="text.secondary">Price: ${car.price.toLocaleString()}</Typography>
                    <Typography variant="body2" color="text.secondary">{car.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ExploreCars;
