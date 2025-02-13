import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AuthorProfile() {
  const [userStatus, setUserStatus] = useState(null); 

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    if (currentUser) {
      setUserStatus(currentUser.blocked);
    }
  }, []);

  if (userStatus === null) {

    return <div>Loading...</div>;
  }

  return (
    <div className="author-profile">
      {userStatus ? (
        <div>Your account is blocked. Please contact the admin.</div>
      ) : (
        <>
          <ul className="d-flex justify-content-around list-unstyled fs-3">
            <li className="nav-item">
              <NavLink to="articles" className="nav-link">
                Articles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="article" className="nav-link">
                Add new Article
              </NavLink>
            </li>
          </ul>
          <div className="mt-5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default AuthorProfile;


