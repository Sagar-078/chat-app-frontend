import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setShowLogin,
  isOtpVerified, setShowForgotePassPage}) => {

  const [showPassword, setShowPassword] = useState(false);

  const {loading} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {email, password} = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }


  return (
    <div className='backgroung max-md:w-[340px] w-[400px] rounded-md py-4 flex flex-col justify-center items-center'>

      {
        loading ? (<div className='flex justify-center items-center spinner h-12 w-12'></div>) 
        : 
        (
          <div className=' w-full h-full items-center justify-center'>
            <h1 className=' font-mono font-bold text-center text-gray-500 text-lg'>Sign In</h1>

            <form className="flex w-full flex-col items-center gap-y-2"
              onSubmit={handleOnSubmit}>

              <label className='w-[90%]'>

                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                    Email Address <sup className="text-pink-400">*</sup>
                </p>

                <input required type="text" name="email" value={email} onChange={handleOnChange}
                placeholder="Enter email address"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] backgroung p-[10px] text-white
                  placeholder:text-white"
                />

              </label>

                      
              <label className="relative w-[90%]">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                  Password <sup className="text-pink-400">*</sup>
                </p>
                <input required type={showPassword ? "text" : "password"} name="password"
                  value={password} onChange={handleOnChange}
                  placeholder="Password"
                  style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] backgroung p-[12px] pr-10 text-white
                  placeholder:text-white"
                />

                <span onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer">

                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}

                </span>

                <p className=" ml-auto max-w-max text-sm text-blue-500 mt-2 cursor-pointer"
                  onClick={() => setShowForgotePassPage(true)}
                >
                  Forgot Password
                </p>

              </label>
              

              <button type="submit"
                  className="button-85 mt-1">
                  Login
              </button>

            </form>

            {
              isOtpVerified ? (<div></div>) : 
              (
                <div className='flex justify-between items-center mx-auto w-[70%] mt-4'>
                  <div>Don't have Account ?</div>
                  <button onClick={() => setShowLogin(false)}>
                      Sign Up
                  </button>
                </div>
              )

            }
          </div>
        )
      }  
      
    </div>
  )
}

export default LoginForm