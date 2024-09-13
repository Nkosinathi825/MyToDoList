import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import './Login.css'; // Import the CSS file
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successfully,setSuccessfully]= useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
       try {
        await axios.post('http://localhost:5000/login',{email,password})
        setSuccessfully('use logged in successfully')
        navigate('/')
       } catch (error) {
        setSuccessfully(error.response.data.message);
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
                <hr></hr>
                <h4>Don't have an account?<Link to={'/register'}>register</Link></h4>
            </form>
        </div>
    );
}

export default Login;
