import React, { useState } from 'react'
import UserSidebar from '../common/UserSidebar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { userToken } from '../common/http'
import { toast } from 'react-toastify'
import Loader from '../common/Loader'

const Profile = () => {
  const [loading,setLoading] = useState(true);
  const{
register,
reset,
setError,
handleSubmit,
formState:{errors}
  }= useForm({
    defaultValues: async () => {
      fetch(`${import.meta.env.VITE_API_URL}/get-profile-details`,{
                     method: 'GET',
                     headers:{
                         'Content-type': 'application/json',
                         'Accept':'application/json',
                         'Authorization': `Bearer ${userToken()}`
                     },
                    
                 }).then(res => res.json())
                 .then(result =>{
                  setLoading(false)
                     console.log(result);
                    reset({
                      name:result.data.name,
                      email: result.data.email,
                      mobile: result.data.mobile,
                      address: result.data.address,
                      city : result.data.city,
                      state: result.data.state,
                      
                    })
                 })
    }
  });
  const updateAccount = async (data) => {
    console.log(data);
    fetch(`${import.meta.env.VITE_API_URL}/update-profile`,{
                     method: 'POST',
                     headers:{
                         'Content-type': 'application/json',
                         'Accept':'application/json',
                         'Authorization': `Bearer ${userToken()}`
                     },
                     body : JSON.stringify(data)
                    
                 }).then(res => res.json())
                 .then(result =>{
                     
                    if(result.status == 200){
                      toast.success(result.message)
                    // }else{
                    //   const formErrors = result.errors;
                    //   Object.keys(formErrors).forEach((field) => {
                    //     setError(field,{message: formErrors[field][0]});
                    //   })
                    // }if (formErrors && typeof formErrors === 'object') {
        Object.keys(formErrors).forEach((field) => {
          // Check if the field array exists and has at least one error message
          const errorMessage = formErrors[field]?.[0] || 'Invalid field';
          setError(field, { message: errorMessage });
        });
      } else {
        // Fallback for generic non-field errors
        toast.error(result.message || 'An unexpected error occurred.');
      }
                 })
  }
  return (
    <div className='container'>
  <div className=' row'>
    <div className=' d-flex justify-content-between mt-5 pb-3'>
      <h4 className="h4 pb-0 mb-0">
       My Account
      </h4>
      {/* <Link className='btn btn-primary'>Button</Link> */}
    </div>
    <div className='col-md-3'>
      <UserSidebar/>
    </div>
    <div className='col-md-9'>
      {
        loading == true && <Loader/>
      }
      {
        loading == false &&  <form onSubmit={handleSubmit(updateAccount)}>
        <div className='card shadow '>
        <div className="card-body p-4">
          <div className="row">
     <div className="mb-3 col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
          {
            ...register('name',{required:"The name field is required"})
          }
          type="text" id='name' placeholder='Enter Name' className={`form-control ${errors.name && 'is-invalid'}`} />
{errors.name && <p className='text-danger'>{errors.name?.message}</p>}
        </div>
         <div className="mb-3 col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
           {
    ...register('email',{
        required: "The email field is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        } 
    })
}
          type="text" id='email'  placeholder='Enter Email' className={`form-control ${errors.email && 'is-invalid'}`} />
{errors.email && <p className='text-danger'>{errors.email?.message}</p>}
        </div>
          </div>
           <div className="row">
     <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
           {
            ...register('address',{required:"The address field is required"})
          }
          type="text" id='address' placeholder='address' className={`form-control ${errors.address && 'is-invalid'}`} />
{errors.address && <p className='text-danger'>{errors.address?.message}</p>}
        </div>
        
          </div>
           <div className="row">
     <div className="mb-3 col-md-6">
          <label htmlFor="mobile" className="form-label">Mobile</label>
          <input
           {
            ...register('mobile',{required:"The mobile field is required"})
          }
          type="text" id='mobile' placeholder='Enter mobile' className={`form-control ${errors.mobile && 'is-invalid'}`}  />
{errors.mobile && <p className='text-danger'>{errors.mobile?.message}</p>}
        </div>
         <div className="mb-3 col-md-6">
          <label htmlFor="city" className="form-label">City</label>
          <input
          {
            ...register('city',{required:"The city field is required"})
          }
          type="text" id='city'  placeholder='city' className={`form-control ${errors.city && 'is-invalid'}`} />
{errors.city && <p className='text-danger'>{errors.city?.message}</p>}
        </div>
          </div>
           <div className="row">
     <div className="mb-3 col-md-6">
          <label htmlFor="state" className="form-label">State</label>
          <input
          {
            ...register('state',{required:"The state field is required"})
          }
          type="text" id='state' placeholder='Enter state' className={`form-control ${errors.state && 'is-invalid'}`} />
{errors.state && <p className='text-danger'>{errors.state?.message}</p>}
        </div>
        
          </div>
       
        </div>
     </div>
      <button className='btn btn-primary mt-4 mb-5'>Update</button>
      </form>
      }
     
     
    </div>
  </div>
 </div>
  )
}

export default Profile