import React, { useContext } from 'react'; // Import useContext
import AddTask from '../component/AddTask';
import './Dashboard.css';
import { UserContext } from '../context/UserContext';

export default function Dashboard() {
  // Use the useContext hook to access the user context
  const { user, login } = useContext(UserContext);
  console.log(user.name,user._id)
  return (
    <main className="container">
      <h1>Welcome, {user?.name}</h1>
      <section className="upper-container">
        <AddTask />
      </section>
      <section className="lower-container">
        
      </section>
    </main>
  );
}
