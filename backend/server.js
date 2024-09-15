import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs'; // Import bcrypt
import User from './models/User.model.js';
import Todo  from './models/Todo.model.js';

dotenv.config();

const app = express();

app.use(express.json());
app.options(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));


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

app.get('/', (req, res) => {
    res.json("hey");
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        
        // Proceed with registration
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            return res.status(401).json({ message: 'Invalid credentials wrong email' });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials wrong password' });
        }
        res.status(200).json({ message: 'Login successful', user: findUser });
    } catch (error) {
        console.error('Login error:', error); 
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/addtodo', async (req, res) => {
    const { user_id, title, description, completed } = req.body;
    try {
        const newTask = new Todo({
            user_id, 
            title,      
            description,
            completed: completed !== undefined ? completed : false
        });


        await newTask.save();

        res.status(201).json({ message: 'Todo added successfully', todo: newTask });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/gettodo', async (req, res) => {
    const user_id = req.query.user_id; 
    try {
        const todos = await Todo.find({ user_id });
        if (!todos.length) {
            return res.status(404).json({ message: 'No todos found' });
        }
        res.status(200).json({ todo: todos });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.delete('/deletetodo/:todo_id', async (req, res) => {
    const { todo_id } = req.params;
    const { user_id } = req.query; 
    try {
        await Todo.deleteOne({ _id: todo_id, user_id });
        const todos = await Todo.find({ user_id });
        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
