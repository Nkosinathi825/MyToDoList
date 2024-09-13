import React, { useState } from 'react';
import './AddTask.css'; // Import the CSS file for styling

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <main className="task-container">
            <section className="task-container-upper">
                <section className="inputGroup">
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
                <section className="inputGroup">
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
                <button className="button-add">Add Task</button>
            </section>
            <section className="task-container-lower">
                <button className="button2">Todos</button>
                <button className="button2">Completed</button>
            </section>
        </main>
    );
}
