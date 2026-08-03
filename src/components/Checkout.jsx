import React, { useContext } from "react";
import BreadCrumb from "./common/BreadCrumb";
import productImg from "../assets/images/Mens/eight.jpg";
import { useState } from "react";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { userToken } from "./common/http";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [payment, setPayment] = useState("cod");
  const { cartData, subTotal, grandTotal, shipping } = useContext(CartContext);
  console.log(cartData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const processOrder = (data) => {
    // console.log(data);
    if (payment === "cod") {
      saveOrder(data, "not paid");
    }
  };
  const saveOrder = (formData, paymentStatus) => {
    const newFormData = {
      ...formData,
      grand_total: grandTotal(),
      shipping: shipping(),
      subtotal: subTotal(),
      discount: 0,
      payment_status: paymentStatus,
      status: "pending",
      cart: cartData
    };
    console.log(newFormData);
    fetch(`${import.meta.env.VITE_API_URL}/save-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(newFormData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          localStorage.removeItem("cart");
         navigate(`/order/confirmation/${result.id}`);
        }else{
          toast.error(result.message);
        }
      });
  };
  const handlePaymentMethod = (e) => {
    setPayment(e.target.value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <BreadCrumb currentPageTitle="Checkout" />
        </div>
      </div>

      <form onSubmit={handleSubmit(processOrder)}>
        <div className="row pt-5">
          <div className="col-md-7">
            <h3 className=" border-bottom pb-3">
              <strong>Checkout</strong>
            </h3>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    {...register("name", {
                      required: "The  name field is required",
                    })}
                    type="text"
                    className={`form-control mb-3 ${errors.name && "is-invalid"}`}
                    placeholder="Name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    {...register("email", {
                      required: "The email field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "The email field must be a valid email",
                      },
                    })}
                    type="email"
                    className={`form-control mb-3 ${errors.email && "is-invalid"}`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  {...register("address", {
                    required: "The address field is required",
                  })}
                  name="address"
                  id=""
                  cols="30"
                  rows="5"
                  className={`form-control ${errors.address && "is-invalid"}`}
                  placeholder="Address"
                ></textarea>
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    {...register("city", {
                      required: "The city field is required",
                    })}
                    type="text"
                    className={`form-control mb-3 ${errors.city && "is-invalid"}`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <div className="invalid-feedback">
                      {errors.city.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    {...register("state", {
                      required: "The state field is required",
                    })}
                    type="text"
                    className={`form-control mb-3 ${errors.state && "is-invalid"}`}
                    placeholder="state"
                  />
                  {errors.state && (
                    <div className="invalid-feedback">
                      {errors.state.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    {...register("zip", {
                      required: "The zip field is required",
                    })}
                    type="text"
                    className={`form-control mb-3 ${errors.zip && "is-invalid"}`}
                    placeholder="zip"
                  />
                  {errors.zip && (
                    <div className="invalid-feedback">{errors.zip.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <input
                    {...register("mobile", {
                      required: "The mobile field is required",
                    })}
                    type="text"
                    className={`form-control mb-3 ${errors.mobile && "is-invalid"}`}
                    placeholder="Mobile"
                  />
                  {errors.mobile && (
                    <div className="invalid-feedback">
                      {errors.mobile.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <h3 className=" border-bottom pb-3">
              <strong>Item</strong>
            </h3>
            <table className="table">
              <tbody>
                {cartData &&
                  cartData.map((item) => {
                    return (
                      <tr key={`cart-${item.id}`}>
                        <td width="100px">
                          <img src={item.image_url} height={80} />
                        </td>
                        <td width="600px">
                          <h2>{item.name}</h2>

                          <div className="d-flex align-items-center pt-3">
                            <span>${item.price.toFixed(2)}</span>
                            <div className="ps-3">
                              {item.size && (
                                <button className="btn btn-size">
                                  {item.size}
                                </button>
                              )}
                            </div>
                            <div className="ps-5">X {item.qty}</div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="row  mt-5">
              <div className="col-md-12">
                <div className=" d-flex justify-content-between border-bottom pb-3">
                  <div>Subtotal</div>
                  <div>${subTotal().toFixed(2)}</div>
                </div>
                <div className=" d-flex justify-content-between border-bottom py-3">
                  <div>Shipping</div>
                  <div>${shipping().toFixed(2)}</div>
                </div>
                <div className=" d-flex justify-content-between border-bottom py-3">
                  <div>
                    <strong>Grand Total</strong>
                  </div>
                  <div>${grandTotal().toFixed(2)}</div>
                </div>
                
              </div>
            </div>
            <h3 className=" border-bottom pb-3">
              <strong>Payment Method</strong>
            </h3>
            <div>
              <input
                type="radio"
                onClick={handlePaymentMethod}
                defaultChecked={payment === "stripe"}
                name="payment"
                value={"stripe"}
                className="me-2"
              />
              <label className="form-label ps-2">Stripe</label>
              <input
                onClick={handlePaymentMethod}
                type="radio"
                checked={payment === "cod"}
                name="payment"
                value={"cod"}
                className="ms-3 me-2"
              />
              <label className="form-label ps-2">COD</label>
            </div>
            <div className=" d-flex  py-3">
              <button className="btn btn-primary ">Pay Now</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
