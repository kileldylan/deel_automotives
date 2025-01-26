const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust path as necessary

// Route to get all employees
router.get('/employee', (req, res) => {
  const sqlQuery = 'SELECT name, role, imageUrl FROM employees'; // Customize column names as per your table
  
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).send("Error fetching employees");
    }
    res.json(results);
  });
});

module.exports = router;
