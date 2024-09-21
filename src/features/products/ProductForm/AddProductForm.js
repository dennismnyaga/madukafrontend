import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCategories,
  selectAllCategories,
} from "../../categories/categorySlice";
import {
  fetchLocations,
  selectAllLocations,
} from "../../location/locationsSlice";
import { fetchShops, selectAllShops } from "../../shops/shopsSlice";
import "./AddProductForm.css";
import { useMediaQuery } from "react-responsive";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, Backdrop, CircularProgress, Fade } from "@mui/material";
import { addNewProduct, getProductsPostError } from "./postProductSlice";
import { selectIsAuthenticated } from "../../auth/authSlice";
import config from "../../../config";
import warningsIcon from "../../../components/images/warning.png"

function loadScript(url, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Other browsers
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
const AddProductForm = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const error = useSelector(getProductsPostError)

  const apimapUrl = process.env.REACT_APP_NODE_ENV === 'googleMaps' ? config.googleMaps.apiKey : config.googleMaps.apiKey;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [ad_title, setAdTitle] = useState("");
  const [category, setAdCategory] = useState("");
  const [location, setAdLocation] = useState("");
  const [description, setAdDescription] = useState("");
  const [price, setAdPrice] = useState("");
  const [shop, setAdShop] = useState("");
  const [image, setSelectedImage] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);

  const productCategory = useSelector(selectAllCategories);
  const productLocation = useSelector(selectAllLocations);
  const productShop = useSelector(selectAllShops);

  const user = useSelector(state => state.auth.user);
  



  const autoCompleteRef = useRef(null);
  let autoComplete;

  useEffect(() => {
    const onLoad = () => {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['establishment'], componentRestrictions: { country: ['KE'] } }
      );

      autoComplete.addListener('place_changed', onPlaceChanged);
    };

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apimapUrl}&libraries=places`, onLoad);
  }, [apimapUrl]);

  const onPlaceChanged = () => {
    const place = autoComplete.getPlace();
    const selectedLocation = place?.name.formatted_address || autoCompleteRef.current.value;
    setAdLocation(selectedLocation);
  };
  

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const dropZoneRef = useRef(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleDelete = (index) => {
    setImageUrl((prevUrls) => prevUrls.filter((url, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    const images = Array.from(files).map((file) => ({
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImage((prevImages) => [...prevImages, ...images]);

    dropZoneRef.current.classList.remove("is-dragover");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dropZoneRef.current.classList.add("is-dragover");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dropZoneRef.current.classList.remove("is-dragover");
  };


  const handleSubmit = async (values) => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect the user to the login page
      return;
    }
    try {
      setIsSaving(true);
      setLoading(true);
      setOpen(true);
  
      const productData = {
        ad_title: ad_title,
        category: category,
        location: location,
        description: description,
        price: parseInt(price),
        shop: shop,
        image: image,
      };
  
     

      const { data } = await dispatch(addNewProduct(productData)).unwrap();
      

  
      setAdTitle("");
      setAdCategory("");
      setAdLocation("");
      setAdDescription("");
      setAdPrice("");
      setAdShop("");
      setSelectedImage(null);
  
      setLoading(false);
      setProgress(0);
      setIsSaving(false);
      navigate(`/product/${data.id}`);
    } catch (error) {
      if (error.response && error.response.status === 401){
        console.log("Error type ", error.response.status)
        throw new Error("You are not authorized to perform this action.");
      }
     
      console.log('Catched error! ',error.response)
      throw error;
    } finally{
      setIsSaving(false);
      setLoading(false);
      setOpen(false);
    }
  };
  


  const handleImageSelect = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("image[]", files[i], files[i].name);
    }
    setSelectedImage(Array.from(files));

    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const url = URL.createObjectURL(files[i]);
      urls.push(url);
    }
    setImageUrl(urls);
  };

  const categoryOptions = productCategory.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  const locationOptions = productLocation.map((location) => (
    <option key={location.id} value={location.id}>
      {location.name}
    </option>
  ));

  const shopOptions = isAuthenticated ? (
    productShop
      .filter((shop) => shop.owner === user.user_id)
      .map((shop) => (
        <option key={shop.id} value={shop.id} className="text-black ">
          {shop.name}
        </option>
      ))
  ) : (
    <option value=""></option>
  );
  
 



  return (
    <>
    { isAuthenticated ? (
      <div>
      <>
      {error && <div className="flesh-error">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </div>}
        

        {isDesktopOrLaptop && (
          <>
            <Formik
              initialValues={{
                ad_title: "",
                category: "",
                location: "",
                description: "",
                price: "",
                shop: "",
                image: null,
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="product-input-form">
                  {step === 1 && (
                    <div className="first-form-design">
                      <div className="first-form ">
                        <div className="left-form">
                          <div className="formed"></div>
                          <label htmlFor="category">AD Category*</label>
                          <Field
                            className="input-options p-2 text-sm"
                            as="select"
                            name="category"
                            id="productCategory"
                            value={category}
                            onChange={(e) => setAdCategory(e.target.value)}
                          >
                            <option />
                            {categoryOptions}
                          </Field>
                          <label htmlFor="location">AD Location*</label>
                         
                          <input
                            className="input-options p-2 text-sm"
                            name="location"
                            id="autocomplete"
                            
                            ref={autoCompleteRef}
                            placeholder="Enter a place"
                            type="text"
                          />
                        </div>
                        <div className="right-form">
                          <div
                            className="drop-zone"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            ref={dropZoneRef}
                          >
                            <label
                              htmlFor="image-upload"
                              className="upload-btn"
                            >
                              Upload
                            </label>
                            <input
                              id="image-upload"
                              type="file"
                              name="image"
                              accept="image/jpeg,image/png,image/gif"
                              onChange={handleImageSelect}
                              multiple
                              className="hidden-input-file p-2 text-sm"
                            />
                          </div>

                          <div className="selected-images">
                            {imageUrl &&
                              imageUrl.map((url, index) => (
                                <div key={url} className="image-container">
                                  <img
                                    src={url}
                                    alt="Selected"
                                    className="thumbnail"
                                  />
                                  <div
                                    className="delete-icon-container"
                                    onClick={() => handleDelete(index)}
                                  >
                                    <CloseIcon />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="next-button">
                        <button type="button" onClick={nextStep} className=" bg-slate-400 px-3 text-white font-bold">
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="second-form">
                      <div className="each">
                        <label htmlFor="ad_title">AD Title*</label>
                        <Field
                          className="input-options px-2 text-sm"
                          name="ad_title"
                          placeholder="Ad Title"
                          value={ad_title}
                          onChange={(e) => setAdTitle(e.target.value)}
                        />
                      </div>
                      <div className="each">
                        <label htmlFor="description">AD Description*</label>

                        <Field
                          className="input-options input-options-textarea outline-none p-2 text-sm"
                          name="textarea"
                          placeholder="Desription"
                          component="textarea"
                          value={description}
                          onChange={(e) => setAdDescription(e.target.value)}
                        />
                      </div>
                      <div className="each">
                        <label htmlFor="price">AD Price*</label>
                        <Field
                          className="input-options p-2 text-sm"
                          name="price"
                          placeholder="Price"
                          type="number"
                          value={price}
                          onChange={(e) => setAdPrice(e.target.value)}
                        />
                      </div>

                      <div className="next-button">
                        <button type="button" onClick={prevStep} className=" bg-slate-400 px-3 text-white font-bold">
                          Previous
                        </button>
                        <button type="button" onClick={nextStep} className=" bg-slate-400 px-3 text-white font-bold">
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="second-form">
                      <div className="each">
                        <label htmlFor="shop">Choose Shop*</label>
                        <Field
                          className="input-options outline-none"
                          as="select"
                          name="shop"
                          id="productShop"
                          value={shop}
                          onChange={(e) => setAdShop(e.target.value)}
                        >
                          <option />
                          {shopOptions}
                        </Field>
                        <label>Don't Have a Shop? Create one</label>
                        <Link to="/addshop" className="create-shop underline text-blue-950">
                          Create Shop
                        </Link>
                      </div>

                      <div className="next-button">
                        <button type="button" onClick={prevStep} className=" bg-slate-400 px-3 text-white font-bold">
                          Previous
                        </button>
                        <button type="submit" className=" bg-slate-400 px-3 text-white font-bold">Submit</button >
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
            {isSaving && (
              <Backdrop open={open} style={{ zIndex: 9999 }}>
              <Fade in={open}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress />
                </div>
              </Fade>
            </Backdrop>
            )}
            
          </>
        )}
      </>
      <>
        {isTabletOrMobile && (
          <>
          <Formik
            initialValues={{
              ad_title: "",
              category: "",
              location: "",
              description: "",
              price: "",
              shop: "",
              image: null,
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="product-input-form">
                {step === 1 && (
                  <div className="first-form-design">
                    <div className="first-form-mobile ">
                      <div className="left-form-mobile">
                        <div className="formed"></div>
                        <label htmlFor="category">AD Category*</label>
                        <Field
                          className="input-options-mobile px-2 outline-none"
                          as="select"
                          name="category"
                          id="productCategory"
                          value={category}
                          onChange={(e) => setAdCategory(e.target.value)}
                        >
                          <option />
                          {categoryOptions}
                        </Field>
                        <label htmlFor="location">AD Location*</label>
                        <Field
                          className="input-options-mobile px-2 outline-none"
                          as="select"
                          name="location"
                          id="productLocation"
                          value={location}
                          onChange={(e) => setAdLocation(e.target.value)}
                        >
                          <option />
                          {locationOptions}
                        </Field>
                      </div>
                      <div className="right-form-mobile">
                        <div
                          className="drop-zone"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          ref={dropZoneRef}
                        >
                          <label htmlFor="image-upload" className="upload-btn">
                            Upload
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleImageSelect}
                            multiple
                            className="hidden-input-file px-2"
                          />
                        </div>

                        <div className="selected-images">
                          {imageUrl &&
                            imageUrl.map((url, index) => (
                              <div key={url} className="image-container">
                                <img
                                  src={url}
                                  alt="Selected"
                                  className="thumbnail"
                                />
                                <div
                                  className="delete-icon-container"
                                  onClick={() => handleDelete(index)}
                                >
                                  <CloseIcon />
                                  {/* You can use any cross icon of your choice here */}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="next-button">
                      <button type="button" onClick={nextStep} className=" bg-slate-400 px-3 text-white font-bold">
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="second-form">
                    <div className="each">
                      <label htmlFor="ad_title">AD Title*</label>
                      <Field
                        className="input-options-mobile px-2"
                        name="ad_title"
                        placeholder="Ad Title"
                        value={ad_title}
                        onChange={(e) => setAdTitle(e.target.value)}
                      />
                    </div>
                    <div className="each">
                      <label htmlFor="description">AD Description*</label>

                      <Field
                        className="input-options-textarea-mobile input-options-textarea text-sm p-2 outline-none w-60"
                        name="textarea"
                        placeholder="Desription"
                        component="textarea"
                        value={description}
                        onChange={(e) => setAdDescription(e.target.value)}
                      />
                    </div>
                    <div className="each">
                      <label htmlFor="price">AD Price*</label>
                      <Field
                        className="input-options-mobile  px-2"
                        name="price"
                        placeholder="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setAdPrice(e.target.value)}
                      />
                    </div>

                    <div className="next-button">
                      <button type="button" onClick={prevStep} className=" bg-slate-400 px-3 text-white font-bold">
                        Previous
                      </button>
                      <button type="button" onClick={nextStep} className=" bg-slate-400 px-3 text-white font-bold">
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="second-form">
                    <div className="each">
                      <label htmlFor="shop">Choose Shop*</label>
                      <Field
                        className="input-options-mobile outline-none"
                        as="select"
                        name="shop"
                        id="productShop"
                        value={shop}
                        onChange={(e) => setAdShop(e.target.value)}
                      >
                        <option />
                        {shopOptions}
                      </Field>
                      <label>Don't Have a Shop? Create one</label>
                      <Link to="/addshop" className="create-shop underline text-blue-800">
                        Create Shop
                      </Link>
                    </div>

                    <div className="next-button">
                      <button type="button" onClick={prevStep} className=" bg-slate-400 px-3 text-white font-bold">
                        Previous
                      </button>
                      <button className=" bg-slate-400 px-3 text-white font-bold" type="submit">Submit</button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          {isSaving && (
              <Backdrop open={open} style={{ zIndex: 9999 }}>
              <Fade in={open}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress />
                </div>
              </Fade>
            </Backdrop>
            )}
        </>
        )}
      </>
    </div>
    ): <div>
      <h5 className=" text-center mb-3 text-red-600 flex flex-col items-center justify-center">
        <img className=" w-10 h-10 object-contain" src={warningsIcon} alt="warning" />
        You should be logged in first!</h5>
      </div>
      }
    </>
    
    
  );
};

export default AddProductForm;
