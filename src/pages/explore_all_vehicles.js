import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
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

const ExploreAllVehicles = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carRoutes/cars');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
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

  // Filter handler
  const handleFilterChange = () => {
    let filtered = carData;

    if (typeFilter) {
      filtered = filtered.filter(car => car.type === typeFilter);
    }
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
    if (colorFilter) {
      filtered = filtered.filter(car => car.color === colorFilter);
    }
    if (yearFilter) {
      filtered = filtered.filter(car => car.year === parseInt(yearFilter));
    }

    setFilteredCars(filtered);
  };

  if (loading) return <CircularProgress />;

  const handleCardClick = (id) => {
    navigate(`/carRoutes/cars/${id}`);
};

  return (
    <>
    <CustomAppBar/>
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>All Vehicles</Typography>

      {/* Filters Section */}
      <Grid container spacing={4}>
        {/* Filter Options */}
        <Grid item xs={12} md={3}>
          <Box sx={{ bgcolor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
            <Typography variant="h6">Filter Options</Typography>

            {/* Vehicle Type Filter */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Vehicle Type</InputLabel>
              <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Supercar">Supercar</MenuItem>
                <MenuItem value="Muscle">Muscle</MenuItem>
                <MenuItem value="Elec Pickup">Elec Pickup</MenuItem>
                <MenuItem value="Elec SUV">Elec SUV</MenuItem>
                <MenuItem value="Elec Sedan">Elec Sedan</MenuItem>
              </Select>
            </FormControl>

            {/* Price Range Filter */}
            <Typography variant="h6" sx={{ mt: 2 }}>Price Range</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {['0-500K', '500K-1M', '1M-2M', '2M-3M', '3M-5M', '5M-10M', '10M+'].map(range => (
                <Button
                  key={range}
                  variant={priceFilter === range ? 'contained' : 'outlined'}
                  onClick={() => setPriceFilter(range)}
                >
                  {range}
                </Button>
              ))}
            </Box>

            {/* Color Filter */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Color</InputLabel>
              <Select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Silver">Silver</MenuItem>
                {/* Add more colors as needed */}
              </Select>
            </FormControl>

            {/* Year of Manufacture Filter */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Year of Manufacture</InputLabel>
              <Select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                <MenuItem value=""><em>All</em></MenuItem>
                {Array.from(new Set(carData.map(car => car.year)))
                  .sort((a, b) => b - a) // Sort years in descending order
                  .map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Apply Filter Button */}
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleFilterChange}>
              Apply Filters
            </Button>
          </Box>
        </Grid>

        {/* Vehicle Cards */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={4}>
            {filteredCars.map(car => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card
                    key={car.id} 
                    sx={{ width: 300, cursor: 'pointer' }} 
                    onClick={() => handleCardClick(car.id)}
                    >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5000${car.image_url}`}
                    alt={car.make}
                  />
                  <CardContent>
                    <Typography variant="h6">{car.make}</Typography>
                    <Typography variant="subtitle1">{car.model} - {car.color}</Typography>
                    <Typography color="text.secondary">Year: {car.year_of_manufacture}</Typography>
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

export default ExploreAllVehicles;
