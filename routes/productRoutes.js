const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createProduct } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', auth, admin, upload.single('image'), createProduct);

module.exports = router;