require('dotenv').config();
const mongoose = require('mongoose');
//console.log(" ENV’den gelen URI:", process.env.MONGO_URI);

const connectDB = async () =>{
  
  mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(' MongoDB bağlantısı başarılı!');
  })
  .catch((err) => {
    console.error(' MongoDB bağlantı hatası:', err);
  });
}
module.exports = connectDB;