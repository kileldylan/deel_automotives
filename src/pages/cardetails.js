import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';

const CarDetails = () => {
    const { id } = useParams(); // Get the car ID from the URL
    const [car, setCar] = useState(null); // State to store car details
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Function to fetch car details by ID
        const fetchCarById = async () => {
            try {
                // Update URL to include car ID
                const response = await fetch(`http://localhost:5000/api/carRoutes/cars/${id}`);
                if (!response.ok) throw new Error('Failed to fetch car details');
                
                const data = await response.json();
                setCar(data); // Set the car data
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching car details:', error);
                setLoading(false);
            }
        };
        fetchCarById(); // Call the fetch function on component mount
    }, [id]);

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (!car) return <Typography variant="h6">Car not found</Typography>;

    // Function to handle "Call Now" button click
    const handleCallNow = () => {
        window.location.href = `tel:+1234567890`; // Replace with actual contact number
    };

    // Function to handle "Enquire via WhatsApp" button click
    const handleWhatsAppEnquiry = () => {
        const message = `Hello, I am interested in the ${car.make} ${car.model}. Can you provide more details?`;
        window.open(`https://wa.me/254758715788?text=${encodeURIComponent(message)}`, '_blank'); // Replace with WhatsApp number
    };

    // Render car details
    return (
        <>
        <CustomAppBar/>
        <Box sx={{ padding: 5, display: 'flex', gap: 5, flexDirection: 'row', backgroundColor: '#f5f5f5' }}>
            <Box
                component="img"
                src={`http://localhost:5000${car.image_url}`} // Use the full image URL here
                alt={car.model}
                sx={{ width: '50%', borderRadius: 2 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004d40' }}>{car.make} {car.model}</Typography>
                <Typography variant="h6">Year: {car.year}</Typography>
                <Typography variant="h6">Price: {car.price}</Typography>
                <Typography variant="body1">{car.description}</Typography>

                <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleCallNow}>
                        Call Now
                    </Button>
                    <Button variant="contained" color="success" onClick={handleWhatsAppEnquiry}>
                        Enquire via WhatsApp
                    </Button>
                </Box>
            </Box>
        </Box>
        <Footer/>
        </>
    );
};

export default CarDetails;
