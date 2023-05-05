const express = require('express');
const cors = require('cors');
const env= require('dotenv').config()
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT;
const backendURL = process.env.REACT_APP_BACKEND_URL;

app.use(cors({ origin: [backendURL] })); //cors origin
app.use(express.json());
app.use(express.urlencoded());
// mongoose.set('strictQuery', false);

app.get('/', (req, res) => {
  res.send('ITP Backend API Running');
});

connectMongoDB()
  .then(() => console.log('MongoDB connection established!!'))
  .catch((err) => console.log(err));

async function connectMongoDB() {
  await mongoose.connect(
    'mongodb+srv://code94:code94_1234@cluster0.ioecl5j.mongodb.net/?retryWrites=true&w=majority'
  );
}

app.use('/product', require('./route/product.route'));
app.use('/admin', require('./route/Admin.route'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
