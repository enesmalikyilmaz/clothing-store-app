const Order = require('../models/Order');   
const User = require('../models/User');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${item.product}` });
      }
      total += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalPrice: total
    });

    res.status(201).json({
      message: 'Sipariş başarıyla oluşturuldu',
      order
    });
  } catch (err) {
    res.status(500).json({ message: 'Sipariş oluşturulamadı', error: err.message });
  }
};

exports.previewOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;
    let detailedItems = [];

    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${item.product}` });
      }

      const subtotal = product.price * item.quantity;

      total += subtotal;
      detailedItems.push({
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal
      });
    }

    res.json({
      items: detailedItems,
      totalPrice: total
    });
  } catch (err) {
    res.status(500).json({ message: 'Tutar hesaplanamadı', error: err.message });
  }
};

// Giriş yapmış kullanıcının kendi siparişlerini getirme
exports.getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({ user: req.user.id })
      .populate('items.product')  // ürün detaylarını getir
      .sort({ createdAt: -1 }); // en son sipariş en üstte

    const response = myOrders.map(order => ({
      id: order._id,
      date: order.createdAt,
      status: order.status,
      totalPrice: order.totalPrice,
      items: order.items.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity
      }))
    }));

    res.json(myOrders);
  } catch (err) {
    res.status(500).json({ message: 'Siparişler alınamadı', error: err.message });
  }
};

// Tüm siparişleri getirir (admin için)
exports.getAllOrders = async (req, res) => {
  try {
    const {status} = req.query;

    const query = status ? { status } : {};

    const allOrders = await Order.find()
      .populate('user', 'name email')  // sadece ad ve e-posta
      .populate('items.product' ,   'name price')  // sadece ürün adı ve fiyat
      .sort({ createdAt: -1 });

      const response = allOrders.map(order => ({
      id: order._id,
      user: order.user,
      date: order.createdAt,
      status: order.status,
      totalPrice: order.totalPrice,
      items: order.items.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity
      }))
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Siparişler getirilemedi', error: err.message });
  }
};

// Siparişin durumunu günceller (sadece admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    )
    .populate('user', 'name email')
    .populate('items.product');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }

    res.json({
      message: 'Sipariş durumu güncellendi',
      updatedOrder
    });
  } catch (err) {
    res.status(500).json({ message: 'Durum güncellenemedi', error: err.message });
  }
};

// Siparişi siler (sadece admin)
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }

    res.json({ message: 'Sipariş silindi', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Sipariş silinemedi', error: err.message });
  }
};              



