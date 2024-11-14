import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, IconButton } from '@mui/material';
import CustomAppBar from './customAppbar';
import Footer from './footer';
import axios from 'axios';

const AboutPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    
    fetchEmployees();
  }, []);

  return (
    <div>
      <CustomAppBar title="About Us" />

      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#00796b' }}>About Us</h1>
        <p style={{ fontSize: '16px', color: '#555' }}>
          We are a leading company dedicated to providing the best solutions for our customers. Our goal is to innovate and offer top-notch services across various sectors. Our team of experts works tirelessly to bring the best experience to our clients.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00796b' }}>Our Vision</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          To be a global leader in technology and services, providing innovative solutions and exceeding customer expectations.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00796b' }}>Our Mission</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          To deliver high-quality services that create value for our clients, foster innovation, and support sustainable growth.
        </p>

        <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold', color: '#00796b' }}>Meat the Team</h2>

        <Grid container spacing={4}>
          {employees.map((employee) => (
            <Grid item xs={12} sm={6} md={4} key={employee.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`http://localhost:5000${employee.imageUrl}`} // Ensure you prepend the base URL
                  alt={employee.name}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#00796b' }}>
                    {employee.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {employee.role}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                  <IconButton>
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#007BFF' }}>Contact Us</h2>
        <p style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#555' }}>
          <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#007BFF' }}></i>
          contact@company.com
        </p>
        <p style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#555' }}>
          <i className="fas fa-phone" style={{ marginRight: '8px', color: '#007BFF' }}></i>
          +123 456 7890
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
