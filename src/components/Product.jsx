import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { CartContext } from "./context/Cart";
import { toast } from "react-toastify";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product,setProduct] = useState([]);
  const [productImages,setProductImages] = useState([]);
  const [productSizes,setProductSizes] = useState([]);
  const [sizeSelected,setSizeSelected] = useState(null);
  const {id} = useParams();
  const {addToCart} = useContext(CartContext);
  
const fetchProduct = async () => {
     await fetch(`${import.meta.env.VITE_API_URL}/get-product/${id}`,{
          method: 'GET',
          headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json',
           
          }
        })
        .then(res => res.json())
        .then(result => {
          if(result.status == 200){
            setProduct(result.data)
            setProductImages(result.data.product_images)
            setProductSizes(result.data.product_sizes);
            // console.log(result.data.product_sizes);
            // console.log(result.data.product_images);
          }else{
            console.log("Something went wrong");
          }
         
        })
  }
  const handleAddToCart = () => {
    console.log("start");
    if(productSizes.length > 0){
       if(sizeSelected == null){
        toast.error("Please select a size")
    }else {
      addToCart(product,sizeSelected)
      toast.success("Product successfully added to cart");
    }
    }else{
      addToCart(product,null)
    }
   
  }
  useEffect(() => {
    fetchProduct()
  },[])
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
                  {
                    productImages && productImages.map((product_image) => {
                      return (
                        <SwiperSlide key={`image-sm-${Product.image_id}`}>
                    <div className="content">
                      <img
                        src={product_image.image_url}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                      )
                    })
                  }
                  

                 
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
                   {
                    productImages && productImages.map((product_image) => {
                      return (
                       <SwiperSlide key={`image-${Product.image_id}`}>
                    <div className="content">
                      <img src={product_image.image_url} alt="" className="w-100" />
                    </div>
                  </SwiperSlide>
                      )
                    })
                  }
                 

                  
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="d-flex">
              <Rating readOnly={true} initialValue={rating} />
              <span className=" pt-1 ps-2">10 reviews</span>
            </div>
            <div className="price h3 py-3">
              ${product.price} &nbsp;
                {
                  product.compare_price &&  <span className=' text-decoration-line-through'> ${product.compare_price}</span>
                }   
            </div>
            <div>
             {product.short_description}
            </div>
            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes mt-2">
               {
                productSizes && productSizes.map(product_size =>{
                  return(
                     <button key={`p-size-${product_size.id}`} onClick={ () => setSizeSelected(product_size.size.name)} className={`btn btn-size ms-2 ${sizeSelected == product_size.size.name ? 'active' : ''}`}>{product_size.size.name}</button>
                  )
                })
               }
               
              </div>
            </div>
            <div className="add-to-cart my-4">
              <button onClick={() => handleAddToCart()} className="btn btn-primary text-uppercase">
                Add to Cart
              </button>
            </div>
            <hr />
            <div>
              <strong>SKU:</strong>
              {product.sku}
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                <div dangerouslySetInnerHTML={{__html:product.description}}>

                </div>
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
