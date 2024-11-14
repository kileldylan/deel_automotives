// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AboutPage from './pages/aboutPage';
import ExploreCars from './pages/explore_cars';
import ExploreSedan from './pages/explore_sedans';
import ExploreSUV from './pages/explore_suv';
import ExploreTruck from './pages/explore_trucks';
import ExploreAllVehicles from './pages/explore_all_vehicles';
import DealerSale from './pages/DealerSale';
import FAQ from './pages/FAQ';
import Contact from './pages/contact';
import TermsAndConditions from './pages/termsandconditions';
import PrivacyPolicy from './pages/privacypolicy';
import CarDetails from './pages/cardetails';
import FilteredCars from './pages/filteredHhome_cars';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutPage" element={<AboutPage/>} />
        <Route path="/explore_cars" element={<ExploreCars />} />
        <Route path="/explore-suvs" element={<ExploreSUV />} />
        <Route path="/explore-sedans" element={<ExploreSedan />} />
        <Route path="/explore-trucks" element={<ExploreTruck />} />
        <Route path="/explore-all-vehicles" element={<ExploreAllVehicles />} />
        <Route path="/DealerSale"element={<DealerSale/>} />
        <Route path="/contact"element={<Contact/>} />
        <Route path="/FAQ"element={<FAQ/>} />
        <Route path="/termsandconditions" element={<TermsAndConditions/>} />
        <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
        <Route path="/carRoutes/cars/:id" element={<CarDetails />} />
        <Route path="/filtered-cars/:range" component={FilteredCars} />


        {/* Add additional routes here */}
      </Routes>
    </Router>
  );
}

export default App;
