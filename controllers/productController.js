const Product = require('../models/Product');

// Ürün ekle 
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;

    const image = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image
    });

    res.status(201).json({ message: 'Ürün eklendi', product });
  } catch (err) {
    res.status(500).json({ message: 'Ürün eklenemedi', error: err.message });
  }
};

// Tüm ürünleri getir 
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ürünler alınamadı', error: err.message });
  }
};

// Ürün güncelle
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ message: 'Ürün güncellendi', updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Güncelleme hatası', error: err.message });
  }
};

// Ürün sil
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({ message: 'Ürün silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silme hatası', error: err.message });
  }
};