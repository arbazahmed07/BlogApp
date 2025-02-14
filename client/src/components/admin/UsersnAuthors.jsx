import React, { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "@clerk/clerk-react"
const UsersnAuthors = () => {
  const [users, setUsers] = useState([]);
  const {getToken}=useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    const userId = currentUser ? currentUser._id : null; 
      console.log(userId); 

    axios.get(`${BACKEND_URL}/user-api/users`,{
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    })
      .then((response) => {
        // console.log(response.data.payload); 
        setUsers(response.data.payload);
      })
      .catch((error) => console.error(error));
  }, []);
  


  const toggleBlockStatus = async (id, blocked) => {
    try {
      const token = await getToken();
      // console.log("token", token);
  
      const response = await axios.put(
        `${BACKEND_URL}/admin-api/admin/block-unblock/${id}`, 
        { blocked: !blocked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, blocked: response.data.payload.blocked } : user
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };
  
  
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.blocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  onClick={() => toggleBlockStatus(user._id, user.blocked)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersnAuthors;
