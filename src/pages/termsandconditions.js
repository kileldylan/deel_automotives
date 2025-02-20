import React from 'react';
import { Box, Typography } from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';

const TermsAndConditions = () => {
    return (
        <>
            <CustomAppBar />
            <Box sx={{ padding: 5, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#004d40' }}>Terms and Conditions</Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>1. Introduction</Typography>
                <Typography paragraph>
                    Welcome to Deel Automotive. These Terms and Conditions govern your use of our services and website. By accessing or using our services, you agree to comply with these terms. If you do not agree, please do not use our services.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>2. Services Offered</Typography>
                <Typography paragraph>
                    Deel Automotive provides a range of services, including:
                    <ul>
                        <li>Vehicle diagnostics and troubleshooting.</li>
                        <li>Routine maintenance (oil changes, tire rotations, etc.).</li>
                        <li>Repair services for mechanical and electrical systems.</li>
                        <li>Parts replacement and upgrades.</li>
                        <li>Emergency roadside assistance.</li>
                    </ul>
                    We reserve the right to modify or discontinue any services without prior notice. 
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>3. User Responsibilities</Typography>
                <Typography paragraph>
                    As a user, you agree to:
                    <ul>
                        <li>Provide accurate and complete information when booking services.</li>
                        <li>Ensure that your vehicle is in a condition suitable for the services requested.</li>
                        <li>Comply with all local laws and regulations regarding vehicle operation and maintenance.</li>
                        <li>Follow all safety instructions provided by Deel Automotive staff.</li>
                    </ul>
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>4. Payment Terms</Typography>
                <Typography paragraph>
                    All services are subject to fees as displayed on our website. Payment is due upon completion of the services, unless otherwise agreed upon in writing. We accept various payment methods, including:
                    <ul>
                        <li>Credit and debit cards.</li>
                        <li>Mobile payments.</li>
                        <li>Cash payments (where applicable).</li>
                    </ul>
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>5. Cancellation Policy</Typography>
                <Typography paragraph>
                    You may cancel or reschedule your appointment up to 24 hours in advance without any charge. Cancellations made less than 24 hours prior may incur a cancellation fee, as determined by Deel Automotive.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>6. Limitation of Liability</Typography>
                <Typography paragraph>
                    Deel Automotive shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services. In any case, our liability will not exceed the total fees paid for the services rendered.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>7. Changes to Terms</Typography>
                <Typography paragraph>
                    Deel Automotive reserves the right to update or modify these Terms and Conditions at any time. Changes will take effect immediately upon posting on our website. Your continued use of our services after any changes indicates your acceptance of the new terms.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>8. Governing Law</Typography>
                <Typography paragraph>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/Region]. Any disputes arising under these terms shall be resolved in the competent courts of [Your Jurisdiction].
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>9. Contact Information</Typography>
                <Typography paragraph>
                    For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@deelautomotive.com">support@deelautomotive.com</a>.
                </Typography>
            </Box>
            <Footer />
        </>
    );
};

export default TermsAndConditions;
