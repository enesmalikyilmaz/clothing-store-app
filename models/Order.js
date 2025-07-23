const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['hazırlanıyor', 'kargoda', 'teslim edildi', 'iptal edildi'],
    default: 'hazırlanıyor',
  },
  deliveryDate: {
  type: Date
  },
  
},{ timestamps: true  });

module.exports = mongoose.model('Order', orderSchema);