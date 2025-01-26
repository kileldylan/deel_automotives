// sellCarRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../api/config/db');

// Get all car sales
router.get('/sell-cars', (req, res) => {
    db.query('SELECT * FROM CarSales', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get a single car sale by ID
router.get('/sell-cars/:id', (req, res) => {
    const saleId = req.params.id;
    db.query('SELECT * FROM CarSales WHERE id = ?', [saleId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Sale not found');
        res.json(results[0]);
    });
});

// Create a new car sale
router.post('/sell-cars', (req, res) => {
    const {registration_number, make, model, colour, year_of_manufacture, mileage, seller_name, seller_contact_number, dealership_name, sale_price } = req.body;
    const query = 'INSERT INTO carsales (registration_number, make, model, colour, year_of_manufacture, mileage, seller_name, seller_contact_number, dealership_name, sale_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [registration_number, make, model, colour, year_of_manufacture, mileage, seller_name, seller_contact_number, dealership_name, sale_price], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Update a car sale by ID
router.put('/sell-cars/:id', (req, res) => {
    const saleId = req.params.id;
    const {registration_number, make, model, colour, year_of_manufacture, mileage, seller_name, seller_contact_number, dealership_name, sale_price } = req.body;
    const query = 'UPDATE carsales SET registration_number = ?, make = ?, model = ?, colour = ?, year_of_manufacture = ?, mileage = ?, seller_name = ?, seller_contact_number = ?, dealership_name = ?, sale_price = ? WHERE id = ?';
    db.query(query, [registration_number, make, model, colour, year_of_manufacture, mileage, seller_name, seller_contact_number, dealership_name, sale_price, saleId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Sale not found');
        res.json({ id: saleId, ...req.body });
    });
});

// Delete a car sale by ID
router.delete('/sell-cars/:id', (req, res) => {
    const saleId = req.params.id;
    db.query('DELETE FROM carsales WHERE id = ?', [saleId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Sale not found');
        res.status(204).send(); // No content
    });
});

module.exports = router;
