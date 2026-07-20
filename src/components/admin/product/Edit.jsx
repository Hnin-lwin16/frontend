import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { token } from "../../common/http";
import { toast } from "react-toastify";

import JoditEditor from "jodit-react";

const Edit = ({placeholder}) => {
   const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder],
  );

  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes,setSizes] = useState([]);
  const [sizesChecked,setSizesChecked] = useState([]);
  // const [gallery, setGallery] = useState([]);
  const [productImages,setProductImages] = useState([]);
  // const [galleryImages, setGalleryImages] = useState([]);
  // console.log(token());
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm(
    {
       defaultValues: async () => {
             const res = fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.data);
        setProductImages(result.data.product_images);
        setSizesChecked(result.productSizes)
        reset({
          title: result.data.title,
          category: result.data.category_id,
          brand: result.data.brand_id,
          sku: result.data.sku,
          qty: result.data.qty,
          short_description: result.data.short_description,
          description: result.data.description,
          price: result.data.price,
          compare_price: result.data.compare_price,
          barcode: result.data.barcode,
          status: result.data.status,
          is_featured: result.data.is_featured,
        
        })
        // console.log(result.data);
        // setCategories(result.data);
      });
              }
    }
  );
  const saveProduct = async (data) => {
    // console.log(data);
    const formData = { ...data, description: content };

    setDisable(true);
    // console.log(data);
    const res = fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);

        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
        // console.log(result);
      });
  };
  const fetchCategories = async () => {
    const res = fetch(`${import.meta.env.VITE_API_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.data);
        setCategories(result.data);
      });
  };
  const fetchBrands = async () => {
    const res = fetch(`${import.meta.env.VITE_API_URL}/brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBrands(result.data);
      });
  };
  const fetchSizes = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/sizes`,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      setSizes(result.data);
    })
  }
  const handleFile = async (e) => {
    // console.log("testing");
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    
formData.append("product_id", id);
    // console.log(file);
   
    setDisable(true);
    const res = fetch(`${import.meta.env.VITE_API_URL}/save-product-image`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.status == 200){
          console.log(result);
          productImages.push(result.data);
          setProductImages(productImages);
        }else{
          toast.error(result.errors.image[0]);
        }
       
        setDisable(false);
        e.target.value = "";
      });
  };
  const deleteImage = async (id) => {
    if(confirm("Are you sure to delete image?")){
      const res = await fetch(`${import.meta.env.VITE_API_URL}/delete-product-image/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization':`Bearer ${token()}`
      }
    })
    .then(res => res.json())
    .then(result => {
      if(result.status == 200){
        const newProductImages = productImages.filter(productImage => productImage.id != id)
        setProductImages(newProductImages)

        toast.success(result.message)
      }else{
        console.log("something wrong");
      }
    })
    }
    
  };
  const changeImage = async (image) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/change-product-default-image?product_id=${id}&image=${image}`,{
      method: 'GET',
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization':`Bearer ${token()}`
      }
    })
    .then(res => res.json())
    .then(result => {
      if(result.status == 200){
        toast.success(result.message)
      }else{
        console.log("something wrong");
      }
    })
  }
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);
  return (
   <div className="container">
      <div className=" row">
        <div className=" d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Products/Edit</h4>
          <Link to="/admin/products" className="btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 mb-5">
          <form onSubmit={handleSubmit(saveProduct)}>
            <div className="card shadow ">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label htmlFor="" className=" form-label">
                    Title
                  </label>
                  <input
                    {...register("title", {
                      required: "The title field is required",
                    })}
                    type="text"
                    className={`form-control ${errors.title && "is-invalid"}`}
                    placeholder="Name"
                  />
                  {errors.title && (
                    <p className="invalid-feedback">{errors.title?.message}</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="">
                        Category
                      </label>
                      <select
                        name=""
                        {...register("category", {
                          required: "Please select a Category",
                        })}
                        className={`form-control ${errors.category && "is-invalid"}`}
                      >
                        <option value="">Select a Category</option>
                        {categories &&
                          categories.map((category) => {
                            return (
                              <option
                                key={`category-${category.id}`}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.category && (
                        <p className="invalid-feedback">
                          {errors.category?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="">
                        Brand
                      </label>
                      <select
                        name=""
                        {...register("brand", {
                          required: "Please select a brand",
                        })}
                        className={`form-control ${errors.brand && "is-invalid"}`}
                      >
                        <option value="">Select a Brand</option>
                        {brands &&
                          brands.map((brand) => {
                            return (
                              <option
                                key={`brand-${brand.id}`}
                                value={brand.id}
                              >
                                {brand.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.brand && (
                        <p className="invalid-feedback">
                          {errors.brand?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Short Description
                  </label>
                  <textarea
                    name=""
                    {...register("short_description")}
                    className="form-control"
                    id=""
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Description
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                  />
                </div>
                <h3 className=" py-3 border-bottom mb-3">Pricing</h3>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Price
                      </label>
                      <input
                        type="text"
                        {...register("price", {
                          required: "The price field is required",
                        })}
                        className={`form-control ${errors.price && "is-invalid"}`}
                        placeholder="Price"
                      />
                      {errors.price && (
                        <p className="invalid-feedback">
                          {errors.price?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Discounted Price
                      </label>
                      <input
                        {...register("compare_price")}
                        type="text"
                        placeholder="Discounted Price"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <h3 className=" py-3 border-bottom mb-3">Inventory</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        SKU
                      </label>
                      <input
                        type="text"
                        {...register("sku", {
                          required: "The sku field is required",
                        })}
                        className={`form-control ${errors.sku && "is-invalid"}`}
                        placeholder="Sku"
                      />
                      {errors.sku && (
                        <p className="invalid-feedback">
                          {errors.sku?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Barcode
                      </label>
                      <input
                        {...register("barcode")}
                        type="text"
                        placeholder="Barcode"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                 <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Qty
                      </label>
                      <input
                        type="text"
                        {...register("qty", {
                          required: "The qty field is required",
                        })}
                        className={`form-control ${errors.qty && "is-invalid"}`}
                        placeholder="qty"
                      />
                      {errors.qty && (
                        <p className="invalid-feedback">
                          {errors.qty?.message}
                        </p>
                      )}
                    </div>
                <div className="row">
                  <div className="col-md-6">
                   <div className="mb-3">
                    <label htmlFor="" className=" form-label">
                      Featured
                    </label>
                    <select
                      {...register("is_featured", {
                        required: "This field is required",
                      })}
                      className={`form-control ${errors.is_featured && "is-invalid"}`}
                    >
                      <option value="yes">Yes</option>

                      <option value="no">No</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {errors.is_featured?.message}
                      </p>
                    )}
                  </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="" className=" form-label">
                        Status
                      </label>
                      <select
                        {...register("status", {
                          required: "Please select a status",
                        })}
                        className={`form-control ${errors.status && "is-invalid"}`}
                      >
                        <option value="">Select a Status</option>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                      {errors.status && (
                        <p className="invalid-feedback">
                          {errors.status?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                   <label htmlFor="" className=" form-label">
                        Sizes
                      </label>
                  {
                    sizes && sizes.map(size => {
                      return (
 <div className="form-check-inline" key={`psize-${size.id}`}>
  <input {
    ...register("sizes")
  }
  checked={sizesChecked.includes(size.id)}
  onChange={(e) => {
    if(e.target.checked){
setSizesChecked([...sizesChecked,size.id])
    }else{
      setSizesChecked(sizesChecked.filter(sid => size.id != sid ))
    }
  }}
  className="form-check-inline ps-2" type="checkbox" value={size.id}  id={`size-${size.id}`}/>
  <label className="form-check-label ps-2" htmlFor={`size-${size.id}`}>
    {size.name}
  </label>
</div>

                      )
                    })
                  }
                 
                </div>
                <h3 className=" py-3 border-bottom mb-3">Gallery</h3>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Image
                  </label>
                  <input
                    {...register("image")}
                    type="file"
                    placeholder="qty"
                    className="form-control"
                    onChange={handleFile}
                  />
                </div>
                <div className="mb-3">
                  <div className="row">
                    {productImages &&
                      productImages.map((image, index) => {
                        return (
                          <div className="col-md-3" key={`image-${index}`}>
                            <div className="card shadow">
                              <img src={image.image_url} alt="" className=" w-100" />
                              <button type="button"
                                className="btn btn-danger"
                                onClick={() => deleteImage(image.id)}
                              >
                                Delete
                              </button>
                               <button type="button" className="btn btn-secondary mt-3" onClick={() => changeImage(image.image)}>
              Set as Default
            </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

           <button type="submit" disabled={disable} className="btn btn-primary mt-3 mb-5">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit