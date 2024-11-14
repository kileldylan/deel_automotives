// components/CustomAppBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import logo from '../images/wahome_logo.jpg';

const CustomAppBar = () => {
    const [exploreAnchorEl, setExploreAnchorEl] = useState(null);

    const handleExploreOpen = (event) => setExploreAnchorEl(event.currentTarget);
    const handleExploreClose = () => setExploreAnchorEl(null);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffffff', margin: 0, padding: 0 }}>
            <Toolbar sx={{ minHeight: 48, padding: '0 16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ height: '120px', objectFit: 'contain', maxWidth: '190px' }}
                    />
                    </Link>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                    <Button sx={{ color: '#004d40' }} onClick={handleExploreOpen} endIcon={<ArrowDropDownIcon />}>
                        Explore Cars
                    </Button>
                    <Menu anchorEl={exploreAnchorEl} open={Boolean(exploreAnchorEl)} onClose={handleExploreClose}>
                        <MenuItem onClick={handleExploreClose} component={Link} to="/explore-all-vehicles">All Vehicles</MenuItem>
                        <MenuItem onClick={handleExploreClose} component={Link} to="/explore-sedans">Sedans</MenuItem>
                        <MenuItem onClick={handleExploreClose} component={Link} to="/explore-suvs">SUVs</MenuItem>
                        <MenuItem onClick={handleExploreClose} component={Link} to="/explore-trucks">Trucks</MenuItem>
                        <MenuItem onClick={handleExploreClose} component={Link} to="/explore-sedans">Sports</MenuItem>
                    </Menu>

                    <Button sx={{ color: '#004d40' }} component={Link} to="/DealerSale">Sell Cars</Button>
                    <Button sx={{ color: '#004d40' }} component={Link} to="/aboutPage">About</Button>
                    <Button sx={{ color: '#004d40' }} component={Link} to="/contact">Contact</Button>
                    <Button sx={{ color: '#004d40' }} component={Link} to="/FAQ">FAQ</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
