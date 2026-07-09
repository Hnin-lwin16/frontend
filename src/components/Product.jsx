import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImgOne from "../assets/images/Mens/five.jpg";
import ProductImgTwo from "../assets/images/Mens/six.jpg";
import ProductImgThree from "../assets/images/Mens/seven.jpg";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BreadCrumb from "./common/BreadCrumb";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);

  return (
    <div className="container productDetail mb-5">
      <div className="row">
        <div className="col-md-12">
         <BreadCrumb currentPageTitle="Product" links={[{ title: "Shop", path: "/shop" }]} />
        </div>
       
      </div>
       <div className="row">
          <div className="col-md-5">
            <div className="row">
              {/* Thumbnail */}
              <div className="col-md-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  direction="vertical"
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgTwo}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgThree}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="col-md-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgOne} alt="" className="w-100" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgTwo} alt="" className="w-100" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgThree} alt="" className="w-100" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2>Dummy Product Title</h2>
            <div className="d-flex">
              <Rating readOnly={true} initialValue={rating} />
              <span className=" pt-1 ps-2">10 reviews</span>
            </div>
            <div className="price h3 py-3">
              $20 <span className="text-decoration-line-through">$18</span>
            </div>
            <div>
              100% Original Products <br />
              Free Delivery on order above $100 <br />
              Pay on delivery might be available <br />
            </div>
            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes mt-2">
                <button className="btn btn-size ms-1">S</button>
                <button className="btn btn-size ms-1">M</button>
                <button className="btn btn-size ms-1">L</button>
                <button className="btn btn-size ms-1">XL</button>
              </div>
            </div>
            <div className="add-to-cart my-4">
              <button className="btn btn-primary text-uppercase">
                Add to Cart
              </button>
            </div>
            <hr />
            <div>
              <strong>SKU:</strong>
              FFGG2
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                Tab content for description
              </Tab>
              <Tab eventKey="profile" title="Reviews(10)">
                Review Area
              </Tab>
            </Tabs>
          </div>
        </div>
    </div>
  );
};

export default Product;
