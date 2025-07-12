const app = require('./app');
const connectDB = require('./db');
const PORT = process.env.PORT || 5000;


connectDB();
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});