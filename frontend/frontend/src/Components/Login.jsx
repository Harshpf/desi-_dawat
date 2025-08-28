import React, { useState } from 'react'
import './Login.css'
import loginimg from '../assets/login.jpg'
import { Loginuser } from './Allapi'



export const Login = () => {


  const[form ,setForm] = useState({email:"", password:""});
  const [msg,setMsg]= useState("");

  const handlechange =(e)=>{
    setForm({  ...form , [e.target.name]: e.target.value});
  }

  const handleSubmit= async(e) => {
         e.preventDefault();

         try{
         const res = await Loginuser( form.email,form.password);
             console.log("Login API Response:", res);   // 👈 check here

         setMsg(res.data.msg||"login sucessful");
         }
         catch(err){
          console.log("error from login");
           setMsg(err.response?.data?.msg || "Login failed");
         } 

  }

    
    
  return (
    <div >
        
           

     <div className="body-container">


          <div className="main-container">
           <h1>Welcome Back!</h1>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, amet.</p>

            <form action="login-page" className="login-page"  onSubmit={handleSubmit}>
              <input name="email"  placeholder='Email' onChange={handlechange}/>
              <input  name = "password" type="password"  placeholder='password'  onChange={handlechange}/>
              <label htmlFor="forgetpassword">forgetpassword?</label>
              {/* <a href=""className='btn-signup' onClick={handleclick}>Signup</a> */}

              <button>Login</button>
              <p>{msg}</p>
               
            </form>

        </div>

        <div className="login-img">
          <img src={loginimg} alt="" />
        </div>

     </div>


      
        
    </div>
  )
}
