import React , { useRef, useState, useEffect } from 'react';
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
import CustomAppBar from './customAppbar';
import Footer from './footer';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

// Importing images
import carHeroImage from '../images/porsche_banner.jpg';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  //const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [carData, setCarData] = useState([]); // Holds car data from API
  const [filteredCars, setFilteredCars] = useState([]); // Holds filtered data by price
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const availableCarsRef = useRef(null);
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(12); // Limit to 12 cards initially

  // Function to fetch data from the Explore cars API
  const fetchCarData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/carRoutes/cars'); // Replace with actual API endpoint
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCarData(data); // Update carData with new API data
      setFilteredCars(data); // Reset filteredCars each fetch
      setDisplayCount(12); // Reset display count to 12 each time data is refreshed
    } catch (error) {
      console.error('Error fetching car data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set up interval to fetch car data every 60 seconds
  useEffect(() => {
    fetchCarData(); // Initial fetch
    const intervalId = setInterval(fetchCarData, 10000); // Refresh data every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Update filteredCars based on priceFilter
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

  const scrollToAvailableCars = () => {
    if (availableCarsRef.current) {
      availableCarsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const car = filteredCars[0]; // Assume the first match is the desired car
    if (car) navigate(`/carDetails/${car.id}`);
  };


  if (loading) return <CircularProgress />;
  return (
    <>
    <div>
      
    <CustomAppBar/>
      <Box sx={{ backgroundColor: '#e0f7fa', padding: 3, textAlign: 'center' }}>
  <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
    Welcome to Wahome Automotive!
  </Typography>
  <Typography variant="h6" sx={{ color: '#004d40', fontFamily: 'Roboto, sans-serif', mt: 1 }}>
    Discover premium cars and unmatched quality – because you deserve the best on the road.
  </Typography>
  <Typography variant="body1" sx={{ color: '#00695c', mt: 2, fontFamily: 'Arial, sans-serif' }}>
    Located at the heart of Mombasa City, 123 Mikindani St, we’re here to bring you closer to your dream ride.
  </Typography>
  <Typography variant="body1" sx={{ color: '#00796b', mt: 1, fontFamily: 'Arial, sans-serif' }}>
    Have questions?{' '}
    <Link to="/contact" style={{ color: '#004d40', fontWeight: 'bold', textDecoration: 'underline' }}>
      Contact Us
    </Link>{' '}
    and let’s get you on the road to a perfect drive!
  </Typography>
</Box>


<Box sx={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
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
            sx={{ width: '600px', marginRight: 1 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          </form>
        </Box>
      </Container>
      {/* Price Range Filter */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , flexWrap: 'wrap', gap: 1, mt: 1 }}>
            <Typography variant="h6" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' , gap: 1, mt: -2 }}>Price Range</Typography>
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
      {/* Display Cars */}
      <Box ref={availableCarsRef} sx={{ backgroundColor: '#ffffff', py: 4 }}>
        <Container>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#004d40', mb: 4, fontWeight: 'bold' }}>
            Available Cars
          </Typography>
          <Grid container spacing={4}>
          {filteredCars.slice(0, displayCount).map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia component="img" height="140" 
                    image={`http://localhost:5000${car.image_url}`}
                    alt={car.model} />
                  <CardContent>
                  <Typography variant="h5" sx={{ color: '#00796b' }}>
                      {car.make}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#00796b' }}>
                      {car.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.description}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#d32f2f', mt: 1 }}>
                      Ksh {car.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    <Footer/>
    </div>
    </>
  );
};

export default Home;
