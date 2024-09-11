import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <main className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Register</h2>
                <section  className="inputGroup">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="input" 
                        required
                    />
                </section >
                <section  className="inputGroup">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="input" 
                        required
                    />
                </section >
                <section className="inputGroup">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input" 
                        required
                    />
                </section >
                <button type="submit" className="button">Register</button>
                <hr></hr>
                <h4>Have an Accout ?<Link to={'/login'}>login</Link></h4>
            </form>
        </main>
    );
}

export default Register;
