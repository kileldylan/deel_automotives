import React from 'react';
import { Box, Typography } from '@mui/material';
import Footer from './footer';
import CustomAppBar from './customAppbar';

const PrivacyPolicy = () => {
    return (
        <>
            <CustomAppBar />
            <Box sx={{ padding: 5, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#004d40' }}>Privacy Policy</Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>1. Introduction</Typography>
                <Typography paragraph>
                    Deel Automotive is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our practices regarding your information.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>2. Information We Collect</Typography>
                <Typography paragraph>
                    We may collect the following types of information:
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and vehicle details.</li>
                        <li><strong>Payment Information:</strong> Credit/debit card details and billing address.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website and services, including IP address, browser type, and access times.</li>
                    </ul>
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>3. How We Use Your Information</Typography>
                <Typography paragraph>
                    We use your information for various purposes, including:
                    <ul>
                        <li>To provide and maintain our services.</li>
                        <li>To process your transactions and send you related information.</li>
                        <li>To communicate with you regarding your appointments, inquiries, and feedback.</li>
                        <li>To improve our website and services based on user feedback and usage patterns.</li>
                        <li>To comply with legal obligations and enforce our terms and conditions.</li>
                    </ul>
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>4. Data Protection and Security</Typography>
                <Typography paragraph>
                    We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the internet or electronic storage is completely secure.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>5. Sharing Your Information</Typography>
                <Typography paragraph>
                    We do not sell or trade your personal information. We may share your information with:
                    <ul>
                        <li><strong>Service Providers:</strong> Third-party vendors who assist us in providing our services.</li>
                        <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                    </ul>
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>6. Your Rights</Typography>
                <Typography paragraph>
                    You have the following rights regarding your personal information:
                    <ul>
                        <li>The right to access your personal data.</li>
                        <li>The right to request correction of inaccurate data.</li>
                        <li>The right to request deletion of your personal data.</li>
                        <li>The right to withdraw consent at any time where we are relying on consent to process your data.</li>
                    </ul>
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>7. Changes to This Privacy Policy</Typography>
                <Typography paragraph>
                    Deel Automotive reserves the right to update this Privacy Policy. We will notify you of any changes by posting the new policy on our website. Your continued use of our services after changes indicates your acceptance of the updated policy.
                </Typography>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>8. Contact Us</Typography>
                <Typography paragraph>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@deelautomotive.com">support@deelautomotive.com</a>.
                </Typography>
            </Box>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
