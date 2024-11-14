import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem , IconButton} from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';
import { Facebook, X } from '@mui/icons-material'; // Import icons
import { blueGrey } from '@mui/material/colors';

const DealerSale = () => {
    const [formData, setFormData] = useState({
        id: '',
        registration_number: '',
        make: '',
        model: '',
        colour: '',
        year_of_manufacture: '',
        mileage: '',
        seller_name: '',
        seller_contact_number: '',
        dealership_name: '',
        sale_price: '',
        sale_date: ''
    });

    const [success, setSuccess] = useState(false); // New state for success message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/sell-cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                console.log('Car sale data submitted successfully');
                alert('Car sale data submitted successfully');
                setSuccess(true); // Set success to true
                setFormData({
                    id: '',
                    registration_number: '',
                    make: '',
                    model: '',
                    colour: '',
                    year_of_manufacture: '',
                    mileage: '',
                    seller_name: '',
                    seller_contact_number: '',
                    dealership_name: '',
                    sale_price: '',
                });
            } else {
                response.text().then(text => alert(`Failed to submit: ${text}`));
            }
        })
        .catch(error => {
            console.error('Error submitting car sale data:', error);
        });
    };

    return (
        <>
        <CustomAppBar/>
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            {/* Hero Section */}
            <Box sx={{ 
                height: '50px', 
                backgroundSize: 'cover', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: blueGrey
            }}>
                <Typography variant="h3" component="h1" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    Sell Your Car with Ease!
                </Typography>
            </Box>
            
           {success && <Typography variant="h5" color="green">Your listing has been submitted successfully! 🎉</Typography>}


            {/* Social Media Links */}
            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                <Typography variant="body2">Share your listing:</Typography>
                <IconButton aria-label="share on facebook" style={{ color: '#1877F2' }}>
                    <Facebook />
                </IconButton>
                <IconButton aria-label="share on twitter style={{ color: '#1DA1F2' }">
                    <X />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Registration Number"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Color"
                    name="colour"
                    value={formData.colour}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    select
                    label="Year of Manufacture"
                    name="year_of_manufacture"
                    value={formData.year_of_manufacture}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                >
                    {Array.from({ length: new Date().getFullYear() - 2007 + 1 }, (_, i) => (
                        <MenuItem key={2007 + i} value={2007 + i}>
                            {2007 + i}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Mileage (km)"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Sale Date"
                    name="sale_date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.sale_date}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Seller Name"
                    name="seller_name"
                    value={formData.seller_name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Seller Contact Number"
                    name="seller_contact_number"
                    value={formData.seller_contact_number}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Dealership Name"
                    name="dealership_name"
                    value={formData.dealership_name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Sale Price (Ksh)"
                    name="sale_price"
                    value={formData.sale_price}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit Listing
                </Button>
            </form>
        </Box>
        <Footer/>
        </>
    );
};

export default DealerSale;
