import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'

const Dashboard = () => {
    const {logout} = useContext(AdminAuthContext);
  return (
    <>
   <div>
     <h1>Dashboard</h1>
    <button className='btn btn-danger' onClick={logout}>Logout</button>
   </div>
    </>
  )
}

export default Dashboard