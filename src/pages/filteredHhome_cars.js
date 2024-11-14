import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const FilteredCars = () => {
  const { range } = useParams(); // Get the price range from the URL
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchFilteredCars = async () => {
      try {
        const response = await fetch(`/api/carRoutes/cars?priceRange=${range}`); // Adjust the API endpoint as needed
        const data = await response.json();
        setFilteredCars(data);
      } catch (error) {
        console.error('Error fetching filtered cars:', error);
      }
    };

    fetchFilteredCars();
  }, [range]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Cars in the Price Range: {range.replace('-', ' to ')}
      </Typography>
      <Grid container spacing={4}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia component="img" height="140" image={car.image} alt={car.model} />
              <CardContent>
                <Typography variant="h5">{car.model}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {car.description}
                </Typography>
                <Typography variant="h6" sx={{ color: '#d32f2f', mt: 1 }}>
                  {car.price.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FilteredCars;
