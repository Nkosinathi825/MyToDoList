import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './DisplayTodo.css';

export default function DisplayTodo({ clicked }) {
    const [todos, setTodos] = useState([]); 
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/gettodo', {
                    params: { user_id: user._id }
                });
                setTodos(response.data.todo);
            } catch (error) {
                alert(error.response?.data?.message || 'An error occurred');
            }
        };

        fetchTodos();
    }, [clicked, user._id]);


    const filteredTodos = todos.filter(todo => 
        clicked === 'T' ? !todo.completed : todo.completed
    );


    const formatDate = (date) => {
        if (!date) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    
    const Delete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deletetodo/${id}`, {
                params: { user_id: user._id }
            });
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };
    return (
        <main className='display-container'>
            <section className='title'>
                <h2>{clicked === 'T' ? 'The Todos' : 'Completed Todos'}</h2>
            </section> 
            <section className='display'>
                {filteredTodos.length ? (
                    <ul className='Display'>
                        {filteredTodos.map(todo => (
                            <li key={todo._id} className='todo'>
                                <section className='title-of-the-todo'>
                                    <span className='title-title'>
                                        <strong>{todo.title}</strong>
                                    </span>
                                    <span className='discription-discription'>
                                        <p className='description'>{todo.description}</p>
                                    </span>
                                </section>
                                <section className='uses'>
                                    {!todo.completed ? (
                                        <>
                                            <button className='button btn1'>Move Up</button>
                                            <button className='button btn2'>Move Down</button>
                                            <button className='button btn3' onClick={() => Delete(todo._id)}>Delete</button>
                                            <button className='button btn4'>completed</button>
                                        </>
                                    ) : (
                                     
                                        <p>Completed at: {formatDate(todo.completedAt)}</p>
                                    )}
                                </section>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <li>No {clicked === 'T' ? 'todos' : 'completed todos'} available</li>
                )}
            </section>
        </main>
    );
}
