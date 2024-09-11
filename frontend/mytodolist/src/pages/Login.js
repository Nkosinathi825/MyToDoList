import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="inputGroup">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="input" 
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input" 
                        required
                    />
                </div>
                <button type="submit" className="button">Login</button>
                <hr></hr>
                <h4>Don't have an account?<Link to={'/register'}>register</Link></h4>
            </form>
        </div>
    );
}

export default Login;
