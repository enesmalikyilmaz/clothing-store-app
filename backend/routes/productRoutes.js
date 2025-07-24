const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.get('/', getAllProducts);
router.post('/', auth, admin, upload.single('image'), createProduct);
router.put('/:id', auth, admin, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router;