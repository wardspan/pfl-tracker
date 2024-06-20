import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [report, setReport] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/admin/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const generateReport = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/admin/report');
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report', error);
    }
  };

  const addTask = async (task) => {
    try {
      await axios.post('http://localhost:5050/api/admin/tasks', task);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5050/api/admin/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const addUser = async (user) => {
    try {
      await axios.post('http://localhost:5050/api/admin/users', user);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5050/api/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Panel</h1>
      <button onClick={generateReport} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Generate Report</button>
      {report && (
        <div>
          <h2 className="text-xl mb-2">Report</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
      <h2 className="text-xl mt-4 mb-2">Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="mb-4 p-4 border rounded">
            <span className="block mb-2">{task.task} - {task.task_date}</span>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white py-1 px-4 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl mt-4 mb-2">Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id} className="mb-4 p-4 border rounded">
            <span className="block mb-2">{user.username}</span>
            <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white py-1 px-4 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
