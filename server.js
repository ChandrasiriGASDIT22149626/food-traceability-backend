const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies 

// Define Routes (You will create these in Step 2)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/batches', require('./routes/batchRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));