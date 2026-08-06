import React, { useState } from 'react'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { token } from '../../common/http';
import { toast } from 'react-toastify';

const Shipping = () => {
    const [disable,setDisable] = useState(false);
  const navigate = useNavigate();
  // console.log(token());
   const {
          register,
          handleSubmit,
          watch,
          reset,
          formState: {errors},
      } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/get-shipping`,{
                method:'GET',
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json())
            .then(result => {
                
                if(result.status == 200){
                    reset({
                        shipping_charge : result.data.shipping_charge
                    })
                    toast.success(result.message);
                }else{
                    console.log("something went wrong");
                }
            })
        }
      });
      const saveShipping = async (data) => {
        setDisable(true)
        console.log(data);
        const res = fetch(`${import.meta.env.VITE_API_URL}/save-shipping`,{
                    method: 'POST',
                    headers:{
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization': `Bearer ${token()}`
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then(result => {
                  setDisable(false)
                    
                    if(result.status == 200){
                        toast.success(result.message);
                        // navigate("/admin/categories");

                    }else{
                        console.log("something wrong");
                    }
                    // console.log(result);
                })
      }
  return (
    <div className='container'>
  <div className=' row'>
    <div className=' d-flex justify-content-between mt-5 pb-3'>
      <h4 className="h4 pb-0 mb-0">
        Shipping
      </h4>
      <Link to="/admin/categories" className='btn btn-primary'>Back</Link>
    </div>
    <div className='col-md-3'>
      <Sidebar/>
    </div>
    <div className='col-md-9'>
      <form  onSubmit={handleSubmit(saveShipping)}>
         <div className='card shadow '>
        <div className="card-body p-4">
        <div className="mb-3">
          <label htmlFor="" className=' form-label'>
          Shipping Charge
        </label>
        <input 
        {
          ...register('shipping_charge',{
            required: "The shipping_charge field is required"
          })
        }
        type="text"  className={`form-control ${errors.shipping_charge && 'is-invalid'}`} placeholder='Shipping Charge' />
        {
          errors.shipping_charge && <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
        }
        </div>
       
        </div>
     </div>
     <button type='submit' className='btn btn-primary mt-3'>Create</button>
      </form>
    
      
    </div>
  </div>
 </div>
  )
}

export default Shipping