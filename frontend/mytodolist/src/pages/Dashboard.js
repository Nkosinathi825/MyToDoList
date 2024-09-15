import React, { useContext, useState } from 'react'; 
import AddTask from '../component/AddTask';
import './Dashboard.css';
import { UserContext } from '../context/UserContext';
import DisplayTodo from '../component/DisplayTodo';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [clicked, setClicked] = useState('T');

  const handleClicked = (value) => {
    setClicked(value);
  };

  return (
    <main className="container">
      <h1>Welcome, {user ? user.name : "guest"}</h1>
      {user ? (
        <>
          <section className="upper-container">
            <AddTask clicked={handleClicked} />
          </section>
          <section className="lower-container">
            <DisplayTodo clicked={clicked} />
          </section>
        </>
      ) : (
        <p>Please log in to manage your tasks.</p>
      )}
    </main>
  );
}
