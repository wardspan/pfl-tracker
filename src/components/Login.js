import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/login', { username, password });
      setUser(response.data.user);
      history.push('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
