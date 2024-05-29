const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');
const TransactionModel = require('./models/transaction');
app.use(express.json());
app.use(cors());
app.get("/api/test",(req,res)=>{
    res.json("Test ok3");
})
app.post('/api/transaction',async(req,res)=>{
  await mongoose.connect(process.env.MOONGODB_URL);
    const { name, description, datetime,price } = req.body;
  console.log(`Received transaction: ${name}, ${description}, ${datetime},${price}`);
  const transaction = await TransactionModel.create({name,description,datetime,price});
  res.json({ status: 'success', data: { name, description, datetime } });
   
})
app.get('/api/transactions',async (req,res)=>{
  await mongoose.connect(process.env.MOONGODB_URL);
  const transactions=await TransactionModel.find();
  res.json(transactions);
})
app.listen(4000);
// 2SPSeRLoV7kpbvXH