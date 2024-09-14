import React, { useState, useContext } from 'react'; // Import useContext
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Import the UserContext

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successfully, setSuccessfully] = useState('');
    const navigate = useNavigate();
    
    // Use the useContext hook to access the UserContext
    const { user, login } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            login(response.data.user); // Call the login function from context
            console.log(user)
            setSuccessfully('User logged in successfully');
            navigate('/');
        } catch (error) {
            setSuccessfully(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <p>{successfully}</p>
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
                <hr />
                <h4>Don't have an account? <Link to={'/register'}>Register</Link></h4>
            </form>
        </div>
    );
}

export default Login;
