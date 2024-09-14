import React, { useState, useContext } from 'react'; 
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './AddTask.css'; 

export default function AddTask({ id }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ error ,setError]=useState('')
    const [status,setStatus]=useState('')
    const { user, logout } = useContext(UserContext); // Use useContext to access the context

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log("Task Submitted:", { title, description });
        console.log(user._id); 

        try {
            const reponse= await axios.post('http://localhost:5000/login',{title,description})
            setStatus("Todo added successfully")

        } catch (error) {
            setError(error.response?.data?.message)
        }
    };

    return (
        <main className="task-container">
            <alert>{status}</alert>
            <form onSubmit={handleSubmit}>
                <section className="task-container-upper">
                    <section className="inputs">
                        <label>Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="input" 
                            placeholder="Enter the title of your todo"
                            required 
                        />
                    </section>
                    <section className="inputs">
                        <label>Description</label>
                        <input 
                            type="text" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="input" 
                            placeholder="Enter the description of your todo"
                            required 
                        />
                    </section>
                </section>
                <section className="task-container-middle">
                    <button type="submit" className="button-add">Add Task</button>
                </section>
            </form>
            <section className="task-container-lower">
                <button className="button2">Todos</button>
                <button className="button2">Completed</button>
            </section>
        </main>
    );
}
