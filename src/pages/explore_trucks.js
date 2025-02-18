import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import Footer from './footer'; // Assuming you have a Footer component
import CustomAppBar from './customAppbar';
import { supabase } from '../supabaseClient'; // Import the Supabase client

const ExploreTruck = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const { data, error } = await supabase.from('cars').select('*').eq('type', 'Truck');
        if (error) throw error;
        setCarData(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <CustomAppBar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Explore Our Trucks</Typography>
        <Grid container spacing={4}>
          {carData.map(car => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={car.image_url} // Assuming image_url is a full URL
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