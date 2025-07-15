const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
 },

  description: { 
        type: String
},

  price: { 
    type: Number, 
    required: true 
},

  stock: { 
    type: Number, 
    required: true, 
    default: 0 },

  category: {
    type: String,

    //Test için kapalı
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'Category', // Kategoriyle bağlantı
    //required: true
  },

  image: { 
        type: String
},
});

module.exports = mongoose.model('Product', productSchema);