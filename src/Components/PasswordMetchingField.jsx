import React from 'react'
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotePasswordUpdate } from '../services/operations/authApi'
import { useNavigate } from 'react-router-dom'

const PasswordMetchingField = ({email}) => {

  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotePasswordUpdate(email, password, confirmPassword, navigate));
  }

  return (
    <div className='grid place-items-center backgroung max-md:w-[340px] w-[400px] rounded-md'>
      {
        loading ? (<div className='flex justify-center items-center spinner h-12 w-12'></div>) 
        : 
        (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">Create new Password</h1>

            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-zinc-600 font-semibold">
                Almost done. Enter your new password and youre all set .
            </p>

            <form className=' flex flex-col justify-center'
              onSubmit={handleOnSubmit}>
                
              <label className="relative">

                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">New Password<sup className="text-pink-400">*</sup></p>

                <input required type={showPassword ? "text" : "password"} 
                name='password' value={password} onChange={(e) =>setPassword(e.target.value)}
                placeholder='Enter password' 
                className="form-style w-full rounded-[8px] py-[12px] px-[12px]"/>

                <span onClick={() => setShowPassword((prev) => !prev)} 
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                  {
                    showPassword ? (<AiFillEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiFillEye fontSize={24} fill="#AFB2BF"/>)
                  }
                </span>
              </label>

              <label className="relative mt-3 block">

                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                  Confirm New Password <sup className="text-pink-400">*</sup>
                </p>

                <input required type={showConfirmPassword ? "text" : "password"} 
                name='confirmPassword' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)}
                placeholder='Confirm password' 
                className="form-style w-full rounded-[8px] py-[12px] px-[12px]"/>

                <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                  {
                    showConfirmPassword ? (<AiFillEyeInvisible fontSize={24} fill="#AFB2BF"/>) 
                    : 
                    (<AiFillEye fontSize={24} fill="#AFB2BF"/>)
                  }
                </span>
              </label>

              <button type='submit' 
                className="button-85 mt-6 w-fit self-center">
                  Reset Password
              </button>

            </form>

          </div>
        )
      }
    </div>
  )
}

export default PasswordMetchingField