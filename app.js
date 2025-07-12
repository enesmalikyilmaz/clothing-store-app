const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;