// components/Footer.js
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, X } from '@mui/icons-material'; // Import icons from MUI

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#004d40', padding: 4, color: '#fff', marginTop: 5 , margin: 0 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Company</Typography>
                    <Link to="/aboutPage" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>About Us</Link>
                    <Link to="/" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block' }}>Home</Link>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Support</Typography>
                    <Link to="/contact" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>Contact Us</Link>
                    <Link to="/FAQ" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block' }}>FAQ</Link>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Social Media</Typography>
                    <Link to="/" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                        <Facebook sx={{ verticalAlign: 'middle', marginRight: '5px' }} /> Facebook
                    </Link>
                    <Link to="/" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block' }}>
                        <X sx={{ verticalAlign: 'middle', marginRight: '5px' }} /> Twitter
                    </Link>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Policies</Typography>
                    <Link to="/privacypolicy" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>Privacy Policy</Link>
                    <Link to="/termsandconditions" style={{ color: '#e0f7fa', textDecoration: 'none', display: 'block' }}>Terms & Conditions</Link>
                </Grid>
            </Grid>
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 4 }}>
                © {new Date().getFullYear()} Wahome Automotive. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
