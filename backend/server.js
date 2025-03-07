const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('MERN Stack Backend is Running!');
});

app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
});
