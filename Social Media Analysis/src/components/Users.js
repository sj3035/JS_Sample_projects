import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://20.208.156.105/test/api/users")
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/posts/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
