require('dotenv').config();
const express = require('express');
//const dotenv = require('dotenv');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


//dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


module.exports = app;