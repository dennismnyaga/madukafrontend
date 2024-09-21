import React, { useEffect, useState } from 'react'
import "./Login.css";
import loginbanner from "./images/mike-petrucci-c9FQyqIECds-unsplash.jpg";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useMediaQuery } from "react-responsive";
import { Alert } from '@mui/material';
import config from '../../config';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';


const SignUp = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;
  const [email, setEmail] = useState("");
  const [otp_number, setOtp_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [otpVerifySuccess, setOtpVerifySuccess] = useState("")
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGettingOtp, setIsGettingOtp] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryFlag, setCountryFlag] = useState('');



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Handle change when a country is selected
  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    setCountryCode(selectedCountryCode);

    // Find the selected country in the countries array
    const selectedCountry = countries.find(country => country.cca2 === selectedCountryCode);
    if (selectedCountry) {
      setCountryFlag(selectedCountry.flags.png);
    }
  };


  const clearAlerts = () => {
    setTimeout(() => {
      setError("");
      setSuccess("");
      setOtpSuccess("");
      setOtpVerifySuccess("");
    }, 5000); // 5000 milliseconds = 5 seconds
  };
  
  // Update useEffect to clear alerts whenever they change
  useEffect(() => {
    if (error || success || otpSuccess || otpVerifySuccess) {
      clearAlerts();
    }
  }, [error, success, otpSuccess, otpVerifySuccess]);
  

  const getOpt = async (e) => {
    e.preventDefault();

    setIsGettingOtp(true)
    try {
      const response = await axios.post(`${apiUrl}/users/sendOtp/`, {
        email: email,
      });
      
      if (response.data.email) {
        setOtpSuccess(response.data.email);
      } else if (response.data.message){
        setOtpSuccess(response.data.message);
      }
      
      setError("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
       
        setError(error.response.data.message); // Set error message from server response
      } else {
        setError("An error occurred while verifying OTP."); // Generic error message
      }
    } finally {
      setIsGettingOtp(false)
    }
  
  }


  const verifyOpt = async (e) => {
    e.preventDefault();

    setIsVerifying(true)
    try {
      const response = await axios.post(`${apiUrl}/users/verifyotp/`, {
        email: email,
        otp_number: otp_number,
      });
  
      // Assuming response.data.message contains the success message
      setOtpVerifySuccess(response.data.message);
      setError(""); // Reset error state since verification was successful
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
       
        setError(error.response.data.message); // Set error message from server response
      } else {
        setError("An error occurred while verifying OTP."); // Generic error message
      }
    } finally {
      setIsVerifying(false)
    }
  };
  


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    

  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${apiUrl}/users/register/`, {
  //       email: email,
  //       password: password,
  //       first_name: firstName,
  //       last_name: lastName,
  //       phone_number: phoneNumber,
  //     });

  //     console.log('Response ', response)
  //     setSuccess(response.data.message);
  //     setEmail("");
  //     setPassword("");
  //     setConfirmPassword("");
  //     setFirstName("");
  //     setLastName("");
  //     setPhoneNumber("");
  //     setError("");
  //   } catch (error) {
  //     if (error.response && error.response.data && error.response.data.message) {
  //       setError(error.response.data.message);
  //     } else {
  //       setError('An error occured trying to register, try again later')
  //     }
      
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    axios.post(`${apiUrl}/users/register/`, {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    })
    .then((response) => {
      console.log('Response:', response.data);
      setSuccess(response.data.message);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setError("");
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred trying to register, try again later');
      }
    });
  };
  

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="login-page">
          <div className="left-banner">
            <img src={loginbanner} alt='log' />
          </div>
          <div className="right-input">
            <div className="user-nav">
              <NavLink end to="/login" className="login-link" >
                <button>Login</button>
              </NavLink>
              <NavLink end to="/signup" className="login-link rounded-xl" >
                <button>SIGN UP</button>
              </NavLink>
            </div>
            <div className="user-input">

              {error && <Alert className='error-msg' severity="error">{error}</Alert>}
              {success && <Alert className='success-smg' severity="success">{success}</Alert>}
              {otpSuccess && <Alert className='success-smg' severity="success">OTP code sent to {otpSuccess}</Alert>}
              {otpVerifySuccess && <Alert className='success-smg' severity="success">{otpVerifySuccess}</Alert>}

              <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required className="email-input" />
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required className="email-input" />
                <label>Email Address</label>

                <div className=' flex '>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="email-input w-3/4" />
                  {/* <button className=' h-7 py-0.5 px-1 uppercase mt-0'>get otp</button> */}
                  {/* <div className=' bg-slate-400 px-2 rounded-md flex items-center h-8 cursor-pointer uppercase font-semibold' onClick={getOpt}>get otp</div> */}

                  {isGettingOtp ? (
                    <div className=' bg-slate-400 px-2 rounded-md flex items-center h-8 cursor-pointer uppercase font-semibold'><CircularProgress /></div>
                  ) : (
                    <div className=' bg-slate-400 px-2 rounded-md flex items-center h-8 cursor-pointer uppercase font-semibold' onClick={getOpt}>get otp</div>
                  )}
                </div>

                <div className=' flex space-x-3 mt-1'>
                  <Box
                  
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 0, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                   
                    <TextField value={otp_number} number onChange={(event) => setOtp_number(event.target.value)} id="standard-basic" label="otp" variant="standard" className='' />
                  </Box>
                  {isVerifying ? (
                    <div className=' bg-slate-400 px-2 rounded-md flex items-center h-8 cursor-pointer uppercase font-semibold'><CircularProgress /></div>
                  ) : (
                    <div className=' bg-slate-400 px-2 rounded-md flex items-center h-8 cursor-pointer uppercase font-semibold' onClick={verifyOpt}>verify</div>
                  )}
                  
                </div>

                <label>Phone Number</label>

                <div className=' flex mb-2'>
                <select id="country" value={countryCode} onChange={handleCountryChange} className=' '>
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.cca2} value={country.cca2} className=' w-1/5'>
                      {country.name.common}
                    </option>
                  ))}
                </select>
                <div>{countryFlag && <img src={countryFlag} alt="Country Flag" />}</div>
      
                  <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required className="email-input" type="text" />
                </div>
                
                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="email-input" />
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required className="email-input" />
                <p>By Signing up you agree to our <span>terms of use</span> and <span>privacy policy</span></p>
                <button>SIGN UP</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="login-page-mobile">
          <div className="right-input-mobile">
            <div className="user-nav-nobile">

              <button><NavLink end to="/login" className="login-link-mobile" activeClassName="active">Login</NavLink></button>



              <button><NavLink end to="/signup" className="login-link-mobile" activeClassName="active">SIGN UP</NavLink></button>

            </div>
            <div className="user-input-mobile">
              {error && <p>Error: {error}</p>}
              {success && <p>Successfully registered!</p>}
              <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required className="email-input" />
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required className="email-input" />


                <label>Email Address</label>

                <div className=' bg-red-600'>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="email-input" />
                  <button>get otp</button>
                </div>


                <label>Phone Number</label>
                <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required className="email-input" type="text" />
                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="email-input" />
                <label>Confirm Passwordfff</label>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required className="email-input" />
                <p>By Signing up you agree to our <span>terms of use</span> and <span>privacy policyyyyy</span></p>
                {/* <button className=''>SIGN UP</button> */}
                <button>bbb</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp
