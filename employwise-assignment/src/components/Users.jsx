import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch {
        console.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [page, navigate]);

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      console.error('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt="avatar" />
          <p>{user.first_name} {user.last_name}</p>
          <button onClick={() => handleEdit(user.id)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Users;
