import React, { useState, useContext } from 'react'; 
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './AddTask.css'; 

export default function AddTask({ clicked }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const { user } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true); // Start loading

        try {
            await axios.post('http://localhost:5000/addtodo', {
                title,
                description,
                user_id: user._id
            });
            setTitle('');
            setDescription('');
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <main className="task-container">
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
                    <button type="submit" className="button-add" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Task'}
                    </button>
                </section>
            </form>
        </main>
    );
}
