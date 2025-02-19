import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';

const Contact = () => {
    return (
        <>
            <CustomAppBar />
            <Box sx={{ padding: 5, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#004d40' }}>Contact Us</Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    We’d love to hear from you! Please fill out the form below or reach out to us directly via the provided contact details.
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#004d40' }}>Get In Touch</Typography>
                        <TextField fullWidth label="Your Name" variant="outlined" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Email Address" variant="outlined" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Message" variant="outlined" multiline rows={4} sx={{ mb: 2 }} />
                        <Button variant="contained" color="primary">Send Message</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#004d40' }}>Contact Details</Typography>
                        <Typography variant="body1"><strong>Email:</strong> kileldylan@gmail.com</Typography>
                        <Typography variant="body1"><strong>Phone:</strong> +254 758715788 </Typography>
                        <Typography variant="body1"><strong>Address:</strong>Thika, Kiambu, Kenya</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default Contact;
