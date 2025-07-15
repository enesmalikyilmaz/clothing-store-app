const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin'
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    //unique: true, // test için kaldırıldı
  },
});

module.exports = mongoose.model('User', UserSchema);