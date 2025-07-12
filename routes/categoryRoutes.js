const express = require('express');
const router = express.Router();
const { createCategory } = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', auth, admin, createCategory);

module.exports = router;