import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.model.js'; 


dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

startServer();

app.get('/',(req,res)=>{
    res.json("hey")
})
app.post('/register',async (req,res)=>{
    const{name ,email,password}=req.body
    try {
        const salt=await  bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,salt)
        const newUser= new User({name,email,password:hashPassword})
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})

