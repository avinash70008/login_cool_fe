import React, { useEffect, useState } from 'react'
import "./Login.css"
import axios from "axios"
import { Form, useNavigate } from 'react-router-dom'



export const Login = () => {


const navigate = useNavigate()

  let obj = {
    email : "",  
    password : "",
}


const [inputval, SetInputVal] = useState(obj);
const [inputErrors, SetInputErrors] = useState({})
const [submit, SetSubmit] = useState(false)
const handleChange = (e) => {
    const {name , value} = e.target;
    SetInputVal({...inputval, [name] : value})
     console.log(inputval)
};

const handleSubmit = (e) => {
    e.preventDefault()
    SetInputErrors(validation(inputval))
    SetSubmit(true)
    login()
}

const validation = (val) => {
    const errors = {};

    if(!val.email){
        errors.email = "Email is required"
    }
    if(!val.password){
        errors.password = "Password is required"
    }
     
    return errors
}

useEffect(() => {

    if(Object.keys(inputErrors).length === 0 && submit){
        SetInputVal({...obj})
    }
},[inputErrors])



const login = async (req , res) => {
    await axios.post("http://localhost:5000/login", inputval)
    .then((dt) => {
        console.log("res", dt.data);
         alert("Login Success")
         navigate("/dashboard")
      
    })
    .catch((err) => {
        console.log(err.message)
        alert("some Technical error")
    })
}

function passwordshow(){
  var x = document.getElementById("passinput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


  return (
    <div  className='loginmainboxes'>
     
      <div className='loginformbox'>
         <form onSubmit={handleSubmit}>
                <h1>Sign in to get started</h1>
        
                <div>
                    <input 
                    className='inputbox'
                        type="email" 
                        name = "email"
                        placeholder="   Email"
                        value = {inputval.email}
                        onChange = {handleChange}
                    />
                </div>
                <p className="error"><small>{inputErrors.email}</small></p>   
                <div> 
                    <input 
                    id='passinput'
                     className='inputbox'
                        type="password" 
                        name = "password"
                        placeholder="   Password"
                        value = {inputval.password}
                        onChange = {handleChange}
                    />
                    
                    <p className="error">{inputErrors.password}</p>   
                    <svg className='svgicon' onClick={passwordshow} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> 

                </div>

                <div className='optionoflogin'>
                  <div>
                  <input type="checkbox" id="keepmelogin" name="keepmelogin" value="keepmelogin" />
                <label for="keepmelogin"><small>keep me login</small></label><br />

                  </div>
                  <div className='forgetpass'><a href='#'><small>Forget password</small></a></div>
                </div>
                
                <br />
               
                <div className='loginbutton'>
                    <button>Login</button>
                </div>
            </form>

            </div>

          


    </div>
  )
}
