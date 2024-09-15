import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './DisplayTodo.css';

export default function DisplayTodo() {
    const [todos, setTodos] = useState([]); 
    const [error,setError]= useState('')
    const { user } = useContext(UserContext);
    const [clicked,setClicked]=useState('')

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/gettodo', {
                    params: { user_id: user._id }
                });
                setTodos(response.data.todo);
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred');
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


    const moveUp = async (index) => {
        if (index > 0) {
            const newTodos = [...todos];
            [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];  // Swap the todos
            setTodos(newTodos);
            await updateTodoOrder(newTodos);  // Persist the new order
        }
    };

    // Move todo down in the list
    const moveDown = async (index) => {
        if (index < todos.length - 1) {
            const newTodos = [...todos];
            [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];  // Swap the todos
            setTodos(newTodos);
            await updateTodoOrder(newTodos);  // Persist the new order
        }
    };

    // Update todo order in the database
    const updateTodoOrder = async (updatedTodos) => {
        try {
            const todosWithOrder = updatedTodos.map((todo, index) => ({
                ...todo,
                order: index
            }));
            await axios.put('http://localhost:5000/updateorder', { user_id: user._id, todos: todosWithOrder });
        } catch (error) {
            console.error('Error updating todo order:', error);
        }
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

    const Completed = async (id) => {
        try {
            await axios.put(`http://localhost:5000/completetodo/${id}`, {
                user_id: user._id,
                completed: true
            });
            setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: true } : todo)));
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <main className='display-container'>
            <section className="task-container-lower">
                <button className="button2 btn5" onClick={() => setClicked('T')}>Todos</button>
                <button className="button2 btn4" onClick={() => setClicked('C')}>Completed</button>
            </section>
            <section className='title'>
                <h2>{clicked === 'T' ? 'The Todos' : 'Completed Todos'}</h2>
            </section> 
            <section className='display'>
                {filteredTodos.length ? (
                    <ul className='Display'>
                        {filteredTodos.map((todo, index) => (
                            <li key={todo._id} className='todo'>
                                {!todo.completed ? (
                                         <section className='title-of-the-todo'>
                                         <span className='title-title'>
                                             <strong>{todo.title}</strong>
                                         </span>
                                         <span className='discription-discription'>
                                             <p className='description'>{todo.description}</p>
                                         </span>
                                     </section>
                                ):(
                                    <section className='title-of-the-todo style'>
                                    <span className='title-title title-style'>
                                        <strong>{todo.title}</strong>
                                    </span>
                                    <span className='discription-discription'>
                                        <p className='description'>{todo.description}</p>
                                    </span>
                                </section>
                                )
                            }
                               
                                <section className='uses'>
                                    {!todo.completed ? (
                                        <>
                                            <button className='button btn1' onClick={() => moveUp(index)} disabled={index === 0}>
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </button>
                                            <button className='button btn2' onClick={() => moveDown(index)} disabled={index === filteredTodos.length - 1}>
                                                <FontAwesomeIcon icon={faArrowDown} />
                                            </button>
                                            <button className='button btn3' onClick={() => Delete(todo._id)}>Delete</button>
                                            <button className='button btn4' onClick={() => Completed(todo._id)}>Completed</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>Completed at: {formatDate(todo.completedAt)}</p>
                                            <button className='button btn3' onClick={() => Delete(todo._id)}>Delete</button>
                                        </>
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
