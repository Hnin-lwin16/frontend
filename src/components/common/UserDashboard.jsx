import React from 'react'

const UserDashboard = () => {
  return (
  <div className="card shadow mb-5 sidebar">
        <div className="card-body p-4">
          <ul>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/admin/categories">Orders</Link>
            </li>
            <li>
              <Link to="/admin/brands">Change Password</Link>
            </li>
           
             <li>
              <Link to="" onClick={logout}>Logout</Link>
            </li>

          </ul>
        </div>
      </div>
  )
}

export default UserDashboard