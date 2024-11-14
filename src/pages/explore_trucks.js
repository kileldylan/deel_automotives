// ExploreTruck.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Footer from './footer'; // Assuming you have a Footer component
import CustomAppBar from './customAppbar';

const ExploreTruck = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carRoutes/cars');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const trucks = data.filter(car => car.type === 'Truck');
        setCarData(trucks);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
    <CustomAppBar/>
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Explore Our Trucks</Typography>
      <Grid container spacing={4}>
        {carData.map(car => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000${car.image_url}`}
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
      <Footer />
    </Container>
    </>
  );
};

export default ExploreTruck;
