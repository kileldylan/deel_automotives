// components/Layout.js
import React from 'react';
import CustomAppBar from './customAppbar';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div>
            <customAppBar />
            <main>{children}</main>
            <footer />
        </div>
    );
};

export default Layout;
