import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successfully,setSuccessfully]= useState('')
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/register', { name, email, password });
            console.log('User registered successfully:');
            setSuccessfully('User regisetered successfully')
            setEmail('')
            setName('')
            setPassword('')
            navigate('/login')
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Register</h2>
                <p>{successfully}</p>   
                <section className="inputGroup">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="input" 
                        required
                    />
                </section>
                <section className="inputGroup">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="input" 
                        required
                    />
                </section>
                <section className="inputGroup">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input" 
                        required
                    />
                </section>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <hr />
                <h4>Have an Account? <Link to="/login">Login</Link></h4>
            </form>
        </main>
    );
}

export default Register;
