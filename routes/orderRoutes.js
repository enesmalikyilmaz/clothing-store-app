const express = require('express');
const router = express.Router();
const {createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder, previewOrder} = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', auth, createOrder);
router.get('/me', auth, getMyOrders);
router.get('/', auth, admin, getAllOrders);
router.put('/:id', auth, admin, updateOrderStatus);  
router.delete('/:id', auth, admin, deleteOrder);    
router.post('/preview', auth, previewOrder);


module.exports = router;
