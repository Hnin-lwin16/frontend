import React from "react";
import BreadCrumb from "./common/BreadCrumb";
import productImg from "../assets/images/Mens/eight.jpg";
import { useState } from "react";
const Checkout = () => {
    const [payment, setPayment] = useState("cod");
    const handlePaymentMethod = (e) => {
        setPayment(e.target.value);
    }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <BreadCrumb currentPageTitle="Checkout" />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-md-7">
          <h3 className=" border-bottom pb-3">
            <strong>Checkout</strong>
          </h3>
          <form action="">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                  placeholder="Address"
                ></textarea>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Mobile"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-5">
          <h3 className=" border-bottom pb-3">
            <strong>Item</strong>
          </h3>
          <table className="table">
            <tbody>
              <tr>
                <td width="100px">
                  <img src={productImg} height={80} />
                </td>
                <td width="600px">
                  <h2>Dummy Product</h2>

                  <div className="d-flex align-items-center pt-3">
                    <span>$10</span>
                    <div className="ps-3">
                      <button className="btn btn-size">5</button>
                    </div>
                    <div className="ps-5">
                      x1
                    </div>
                  </div>
                </td>
               
                
              </tr>
              <tr>
                <td width="100px">
                  <img src={productImg} height={80} />
                </td>
                <td width="600px">
                  <h2>Dummy Product</h2>

                  <div className="d-flex align-items-center pt-3">
                    <span>$10</span>
                    <div className="ps-3">
                      <button className="btn btn-size">5</button>
                    </div>
                     <div className="ps-5">
                      x1
                    </div>
                  </div>
                </td>
                
              </tr>
            </tbody>
          </table>
           <div className='row  mt-5'>
        <div className='col-md-12'>
            <div className=" d-flex justify-content-between border-bottom pb-3">
                <div>
                    Subtotal
                </div>
                <div>$20</div>
            </div>
             <div className=" d-flex justify-content-between border-bottom py-3">
                <div>
                    Shipping
                </div>
                <div>$5</div>
            </div>
             <div className=" d-flex justify-content-between border-bottom py-3">
                <div>
                    <strong>Grand Total</strong>
                </div>
                <div>$25</div>
            </div>
            <div className='d-flex justify-content-end py-3'>
                <button className='btn btn-primary w-100'>Proceed to Checkout</button>

               
        </div>
            </div>
        </div>
        <h3 className=" border-bottom pb-3">
            <strong>Payment Method</strong>
          </h3>
          <div>
            <input type="radio" onClick={handlePaymentMethod} checked={payment === "stripe"}  name="payment" value={"stripe"} className="me-2" />
            <label  className="form-label ps-2">Stripe</label>
            <input onClick={handlePaymentMethod} type="radio" checked={payment === "cod"} name="payment" value={"cod"} className="ms-3 me-2" />
            <label  className="form-label ps-2">COD</label>
          </div>
          <div className=" d-flex  py-3">
            <button className="btn btn-primary ">Pay Now</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
