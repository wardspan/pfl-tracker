import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const date = new Date().toLocaleString();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-between items-center">
        <li><Link to="/">Tasks</Link></li>
        {user.isAdmin && <li><Link to="/admin">Admin</Link></li>}
        <li>{user.username}</li>
        <li>{date}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
