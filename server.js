// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
connectDB();


// Add these lines to server.js



const app = express();
app.use(express.json()); 

app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/batches', require('./routes/batchRoutes'));
// app.use('/api/batches', require('./routes/batchRoutes')); // Comment this out until you create the file!

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));