import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminProfile() {

  return (
    <div className="admin-profile">
      <ul className="d-flex justify-content-around list-unstyled fs-3">
        <li className="nav-item">
          <NavLink to="UsersnAuthors" className="nav-link">
            Users & Authors
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="usersnauthors" className="nav-link">
            Blocked Users and Authors
          </NavLink>
        </li> */}
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminProfile;


