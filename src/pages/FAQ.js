import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const faqs = [
        {
            question: "What services does Wahome Automotive provide?",
            answer: "Wahome Automotive specializes in vehicle repairs, maintenance services, and diagnostics for various car models. We also offer parts replacement and customization services."
        },
        {
            question: "How can I schedule a service appointment?",
            answer: "You can schedule an appointment through our website or by calling our service center directly at +123 456 7890."
        },
        {
            question: "Do you offer warranties on your services?",
            answer: "Yes, we provide warranties on both parts and labor for a specified period. Please inquire about specific services for more details."
        },
        {
            question: "What should I do if my car breaks down?",
            answer: "If your car breaks down, please contact our roadside assistance service. We will send a team to help you as quickly as possible."
        },
        {
            question: "Can I get a quote for repairs online?",
            answer: "Yes, you can request a quote through our website. Please provide details about the vehicle and the issues you are experiencing for an accurate estimate."
        },
        {
            question: "What types of cars do you service?",
            answer: "We service a wide range of cars, including sedans, SUVs, trucks, and hybrids. Our technicians are trained to work on various brands and models."
        },
    ];

    return (
        <>
            <CustomAppBar />
            <Box sx={{ padding: 5, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#004d40' }}>Frequently Asked Questions</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        {faqs.map((faq, index) => (
                            <Accordion key={index} sx={{ mb: 2 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#e0f7fa' }}>
                                    <Typography variant="h6">{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{faq.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default FAQ;
