import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer} from "react-icons/rx";
import { sendForgotePasswordToken } from '../services/operations/authApi';
import {verifyForgoteOtp} from '../services/operations/authApi';

const OtpVerifyPage = ({setTokenEmailsend, email, otp, setOtp, setIsForgoteOtpVerified}) => {

  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(verifyForgoteOtp(email, otp, setIsForgoteOtpVerified));

  }

  return (
    <div className='grid place-items-center backgroung max-md:w-[340px] w-[400px] rounded-md justify-center items-center'>
      {
        loading ? (<div className='flex justify-center items-center spinner h-12 w-12'></div>) 
        : 
        (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-zinc-600 font-semibold">A verification code has sent to you. Enter the code below</p>

            <form className='flex justify-center items-center flex-col pt-6'
              onSubmit={handleOnSubmit}>

              <OTPInput numInputs={4} value={otp}
                onChange={setOtp}
               renderSeparator={<span>-</span>}
               renderInput={(props) => 
               <input {...props}
               style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }} 
               className="w-[36px] lg:w-[44px] border-0 backgroung rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"/>}
               containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}

              />

              <button type='submit'  className="button-85 mt-8">
                Verify Email
              </button>

            </form>


            <div className="mt-6 flex items-center justify-between">
              <div className=' cursor-pointer'
                onClick={() => setTokenEmailsend(false)}>
                <p className="text-white flex items-center gap-x-2">
                  <BiArrowBack />Back to previous
                </p>
              </div>

              <button
                onClick={() => dispatch(sendForgotePasswordToken(email, setTokenEmailsend),setOtp(""))}
               className="flex items-center text-blue-500 gap-x-2">
                <RxCountdownTimer />
                Resend it
              </button>

            </div>

          </div>
        )    
      }
    </div>
  )
}

export default OtpVerifyPage