import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/DB.js';
import AuthRouter from './routes/authRoutes.js';
import UserRouter from './routes/userRoutes.js';

dotenv.config();

const PORT=process.env.PORT||3000;
const app=express();

//Middlewares

app.use(express.json());

//Routes
app.use('/api/auth',AuthRouter)
app.use('/api/users',UserRouter)


//connection
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is listening on port:${PORT}`);
})


