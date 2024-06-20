import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
//import './styles/tailwind.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user && <Navbar user={user} />}
      <Routes>
        <Route path="/login" element={<Login   />}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Login   />}/>
        <Route pasth="/tasks" element={<TaskList user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
