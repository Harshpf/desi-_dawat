import React, { useState } from "react";
import { signupUser } from "./Allapi";
import './Signup.css';
import myimg from '../assets/login.jpg';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: "",  email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});



  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;


  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters and include a number,upercase,lowercase';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });





  const handleSubmit = async (e) => {
    e.preventDefault();

     if (validate()) {
      // console.log('Send to backend:', form);
       
     }


    try {
      const res = await signupUser( form.name, form.email, form.password);
      // console.log (res.data.msg);
      setMsg(res.data.msg || "Signup successful");
      navigate('/login');

     

    } catch (err) {
      
       const msg = err?.response?.data?.msg;
        // console.log(msg);
      if (msg === " already register" ) {
          setMsg(msg);
             navigate('/login');}

      // if(err.status === 400){
      // navigate('/login'); 
      // }
      else{
        setMsg(err.response?.data?.msg|| "Signupfalied");

      }

       
      
    }
  };

  return (
    <div className="signup-header">

       

    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="head-container"> Signup </h2>
      <input name="name" placeholder="username" onChange={handleChange} />
              {/* <div style={{ color: 'red' }}>{error.name}</div> */}
               {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}


      <input name="email" placeholder="Email" onChange={handleChange} />
              {/* <div style={{ color: 'red' }}>{error.email}</div> */}
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}


      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
              {/* <div style={{ color: 'red' }}>{error.password}</div> */}
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}



      <button type="submit">Sign Up</button>
      <p style={{color: 'green'}}>{msg}</p>
    
                        

    </form>
         
       
      

    
      <div className="img-container">
        <img src={myimg} alt="" className="img"/>
      </div>

      

    </div>

    
  );
};

export default Signup;
