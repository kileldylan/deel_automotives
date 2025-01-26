const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Import the db connection
const path = require('path'); // Import the path module
const employeeRoutes = require('./routes/employee'); // Import employee routes
const carRoutes = require('./routes/carRoutes');
const app = express();
const sellCarRoutes = require('./routes/sellCarRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.json());

console.log("Serving static files from:", path.join(__dirname, 'employee_images'));

app.use('/employee_images', express.static(path.join(__dirname, 'employee_images')), (req, res, next) => {
  console.log(`Requested: ${req.url} from employee_images`);
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')), (req, res, next) => {
  console.log(`Requested: ${req.url} from images`);
  next();
});



app.use('/api', employeeRoutes); // Sets up the endpoint at `/api/employees`
app.use('/api', carRoutes); // Prefix routes with /api
app.use('/api', sellCarRoutes);

const PORT = process.env.PORT || 5000;
require('dotenv').config(); // Load environment variables

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
