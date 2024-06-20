import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [date] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/tasks/${user.username}`);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, [user]);

  const handleCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task._id === taskId ? { ...task, completed: true } : task
    ));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5050/api/tasks/${user.username}/submit`, { tasks, comments });
      alert('Tasks submitted successfully');
    } catch (error) {
      console.error('Error submitting tasks', error);
    }
  };

  const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Tasks for {date}</h1>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <ul>
        {filteredTasks.map(task => (
          <li key={task._id} className="mb-4 p-4 border rounded">
            <span className="block mb-2">{task.task} - Due: {task.task_date}</span>
            <button onClick={() => handleCompletion(task._id)} className="bg-green-500 text-white py-1 px-4 rounded">Complete</button>
            <input
              type="text"
              placeholder="Comments"
              value={comments[task._id] || ''}
              onChange={(e) => setComments({ ...comments, [task._id]: e.target.value })}
              className="mt-2 p-2 border rounded w-full"
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Submit</button>
    </div>
  );
};

export default TaskList;
