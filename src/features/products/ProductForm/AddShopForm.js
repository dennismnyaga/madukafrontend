import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories, selectAllCategories } from "../../categories/categorySlice";
import { fetchLocations, selectAllLocations } from "../../location/locationsSlice";
import "./AddProductForm.css";
import { useMediaQuery } from "react-responsive";
import { addNewShop } from "./postShopSlice";
import { getProductsPostError } from "./postShopSlice";
import { Alert, AlertTitle, Backdrop, CircularProgress, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectIsAuthenticated } from "../../auth/authSlice";
import config from "../../../config";




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

const AddShopForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 1224px)",});
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(getProductsPostError)

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [category, setAdCategory] = useState("");
  const [location, setAdLocation] = useState("");
  const [description, setAdDescription] = useState("");
  const [shopimages, setSelectedImage] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);

  const productCategory = useSelector(selectAllCategories);
  
  const productLocation = useSelector(selectAllLocations);


  const apimapUrl = process.env.REACT_APP_NODE_ENV === 'googleMaps' ? config.googleMaps.apiKey : config.googleMaps.apiKey;


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

 const isAuthenticated = useSelector(selectIsAuthenticated)

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect the user to the login page
      return;
    }
    try {
      setIsSaving(true);
      setLoading(true);
      setOpen(true);
  
      const shopData = {
        name: name,
        category: parseInt(category),
        location: location,
        description: description,
        shopimages: shopimages,
      };
  
      const { data} = await dispatch(addNewShop(shopData)).unwrap();

  
       setName('');
      setAdCategory('');
      setAdLocation('');
      setAdDescription('');
      setSelectedImage(null);
  
      setLoading(false);
      setProgress(0);
      setIsSaving(false);
      navigate(`/singleshop/${data.id}`);
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
  // ====================
  

  const handleImageSelect = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("shopimages[]", files[i], files[i].name);
    }
    setSelectedImage(Array.from(files))

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
  

 

  
    return (
      <div>
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
          name: "",
          category: "",
          location: "",
          description: "",
          shopimages: null,
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
                    <label htmlFor="category">Shop Category*</label>
                    <Field
                      className="input-options"
                      as="select"
                      name="category"
                      id="productCategory"
                      value={category}
                      onChange={(e) => setAdCategory(e.target.value)}
                    >
                      <option />
                      {categoryOptions}
                    </Field>
                    <label htmlFor="location">Shop Location*</label>
                    {/* <Field
                      className="input-options"
                      as="select"
                      name="location"
                      id="productLocation"
                      value={location}
                      onChange={(e) => setAdLocation(e.target.value)}
                    >
                      <option />
                      {locationOptions}
                    </Field> */}
                    <input
                            className="input-options"
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
                      <label htmlFor="image-upload" className="upload-btn">
                        Upload
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        name="shopimages"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageSelect}
                        multiple
                        className="hidden-input-file"
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
                  <button type="button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
  
            {step === 2 && (
              <div className="second-form">
                <div className="each">
                  <label htmlFor="name">Shop Name</label>
                  <Field
                    className="input-options"
                    name="name"
                    placeholder="Shop name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="each">
                  <label htmlFor="description">Shop Description*</label>
  
                  <Field
                    className="input-options input-options-textarea"
                    name="textarea"
                    placeholder="Desription"
                    component="textarea"
                    value={description}
                    onChange={(e) => setAdDescription(e.target.value)}
                  />
                </div>
                
  
                <div className="next-button">
                  <button type="button" onClick={prevStep}>
                    Previous
                  </button>
                  <button type="submit">Submit</button>
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
      {isTabletOrMobile && (
        <>
        <Formik
        initialValues={{
          name: "",
          category: "",
          location: "",
          description: "",
          shopimages: null,
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
                    <label htmlFor="category">Shop Category*</label>
                    <Field
                      className="input-options-mobile"
                      as="select"
                      name="category"
                      id="productCategory"
                      value={category}
                      onChange={(e) => setAdCategory(e.target.value)}
                    >
                      <option />
                      {categoryOptions}
                    </Field>
                    <label htmlFor="location">Shop Location*</label>
                    <Field
                      className="input-options-mobile"
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
                        name="shopimages"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageSelect}
                        multiple
                        className="hidden-input-file"
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
                  <button type="button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
  
            {step === 2 && (
              <div className="second-form">
                <div className="each">
                  <label htmlFor="name">Shop Name</label>
                  <Field
                    className="input-options-mobile"
                    name="name"
                    placeholder="Ad Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="each">
                  <label htmlFor="description">Shop Description*</label>
  
                  <Field
                    className="input-options-textarea-mobile input-options-textarea"
                    name="textarea"
                    placeholder="Desription"
                    component="textarea"
                    value={description}
                    onChange={(e) => setAdDescription(e.target.value)}
                  />
                </div>
                
  
                <div className="next-button">
                  <button type="button" onClick={prevStep}>
                    Previous
                  </button>
                  <button type="submit">Submit</button>
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
    </div>
      
    );
  };

export default AddShopForm
