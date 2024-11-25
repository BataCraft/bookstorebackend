const express = require('express');
const dotenv = require('dotenv');
const mongoose_db = require('./model/DB_connection');
const cors = require('cors');  

dotenv.config();

const port = process.env.PORT || 8000;

// Set up MongoDB connection
mongoose_db();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS middleware (enable all origins)
app.use(cors()); // Corrected middleware usage

// Import routes
app.use(require('./Routing/bookstore'));

// Start server
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
