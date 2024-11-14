// carRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get cars with optional filtering, limit, and offset
router.get('/carRoutes/cars', (req, res) => {
    const { priceRange, type, limit, offset } = req.query;
    let query = 'SELECT * FROM cars';
    let params = [];

    // Apply filtering based on query parameters
    if (priceRange || type) {
        query += ' WHERE';
        
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-');
            query += ' price BETWEEN ? AND ?';
            params.push(minPrice, maxPrice);
        }
        
        if (type) {
            if (priceRange) query += ' AND';
            query += ' type = ?';
            params.push(type);
        }
    }

    query += ' ORDER BY RAND()'; // Random order
    if (limit) query += ' LIMIT ?';
    if (offset) query += ' OFFSET ?';
    if (limit) params.push(parseInt(limit));
    if (offset) params.push(parseInt(offset));

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get a single car by ID
router.get('/carRoutes/cars/:id', (req, res) => {
    const carId = req.params.id;
    db.query('SELECT * FROM cars WHERE id = ?', [carId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Car not found');
        res.json(results[0]);
    });
});

// Create a new car
router.post('/carRoutes/cars', (req, res) => {
    const { make, model, year, price, type, image_url, description } = req.body;
    const query = 'INSERT INTO cars (make, model, year, price, type, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [make, model, year, price, type, image_url, description], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Update a car by ID
router.put('/carRoutes/cars/:id', (req, res) => {
    const carId = req.params.id;
    const { make, model, year, price, type, image_url, description } = req.body;
    const query = 'UPDATE cars SET make = ?, model = ?, year = ?, price = ?, type = ?, image_url = ?, description = ? WHERE id = ?';
    db.query(query, [make, model, year, price, type, image_url, description, carId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Car not found');
        res.json({ id: carId, ...req.body });
    });
});

// Delete a car by ID
router.delete('/carRoutes/cars/:id', (req, res) => {
    const carId = req.params.id;
    db.query('DELETE FROM cars WHERE id = ?', [carId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send('Car not found');
        res.status(204).send(); // No content
    });
});

module.exports = router;
