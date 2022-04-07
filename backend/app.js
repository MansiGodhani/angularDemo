const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));//for image
dotenv.config();

mongoose
    .connect('mongodb://localhost:27017/authdatabase')
    .then(()=> console.log('mongodb connect..'));

//route middleware
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/carts', cartRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

// app.get('/', (req,res)=> res.send('Hello..'));

app.listen(port, ()=> console.log(`Server listing port ${port}`));

