import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './component/ProtectedRoute';
import './App.css'

function App() {
    return (
        <main>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </UserProvider>
        </main>
    );
}

export default App;
