import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi"
import {sendForgotePasswordToken} from "../services/operations/authApi";

const ForgotePassword = ({setShowForgotePassPage, setTokenEmailsend, email, setEmail}) => {

  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(sendForgotePasswordToken(email, setTokenEmailsend));
  }

  return (
    <div className="grid place-items-center backgroung max-md:w-[340px] w-[400px] rounded-md justify-center items-center">
      
      {

        loading ? (<div className='flex justify-center items-center spinner h-12 w-12'></div>) 
        : 
        (
          <div className="max-w-[500px] p-4 lg:p-8">

            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
              Reset your Password
            </h1>

            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-zinc-600 font-semibold">
              Have no fear. we'll email you instruction to reset your password. You don't have access to your email we can try account recovery .
            </p>

            <form  className='flex flex-col justify-center items-center'
              onSubmit={handleOnSubmit}>
              <label className="w-full">

                <p className=" text-[0.875rem] leading-[1.375rem] text-white">Email Address: <sup className="text-pink-400">*</sup></p>
                
                <input required type='email' name='email' value={email}
                  onChange={(e) => setEmail(e.target.value)}  
                  placeholder='Enter Your email Adress'
                className="form-style w-full mt-6 rounded-[8px] py-[12px] px-[12px]"/>
              
              </label>

              <button type='submit' 
                className="button-85 mt-6">
                Reset Password
              </button>

            </form>

            <div className="mt-6 flex items-center justify-between cursor-pointer"
              onClick={() => setShowForgotePassPage(false)}>
              <p className="flex items-center gap-x-2 text-white">
                <BiArrowBack /> Back to Login
              </p>
            </div>

          </div> 
        )

      }

    </div>
  )
}

export default ForgotePassword