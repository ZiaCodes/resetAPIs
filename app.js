const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorhandler');
require('express-async-errors');
require('dotenv').config();
require('./db')
const app = express()
app.use(express.json())
app.use(morgan('dev'));

const PORT = 8000 || process.env.PORT

//test Page
// app.post("/sign-in",(req, res, next)=>{
//     const { email, password } = req.body;
//     if( !email || !password)
//         return res.json({error : "Email/password is missing"});
//     next();
// },
// (req,res)=>{
//     res.send('<h2>Review App backend End poin</2>');
// })



const userRouter = require('./routes/user')

//prefix Api
app.use('/api/user', userRouter);


//async error handling
app.use(errorHandler);

//listning
app.listen(PORT,()=>{
    console.log(`🚀 Server is running at https://localhost:${PORT}`);
})