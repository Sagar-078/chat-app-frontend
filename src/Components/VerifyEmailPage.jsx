import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authApi';

const VerifyEmailPage = ({setShowSignUpForm, setShowLogin, setIsOtpVerified}) => {

  const {loading, signUpData} = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch(); 


  useEffect(() => {
    if(!signUpData){
      setShowSignUpForm(false);
    }
  }, []);

  /// here i can check 
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {name, email, password, confirmPassword} = signUpData;

    dispatch(signUp(name, email, password, confirmPassword, otp, setShowLogin));
    setIsOtpVerified(true);
  }

  return (
    <div>
      {
        loading ? (<div className='flex justify-center items-center spinner h-12 w-12'></div>) : 
        (
          <div className='backgroung max-md:w-[340px] w-[400px] flex justify-center flex-col items-center rounded-lg p-4'>
            <div className='w-[90%] flex justify-center flex-col items-center'>
              <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-white">A verification code has sent to you. Enter the code below : </p>
            </div>
  
            <form className='flex flex-col justify-center items-center gap-y-9' 
              onSubmit={handleOnSubmit}>
    
              {/* here i willl check onchange */}
              <OTPInput numInputs={4}  value={otp} onChange={setOtp}
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
    
              <button type='submit'  className="button-85">
                Verify Email
              </button>
    
            </form>
  
            <div className='w-full mt-6 flex items-center justify-between'>
              <div onClick={() => setShowSignUpForm(true)} className=' cursor-pointer'>
                    
                <p className="text-white flex items-center gap-x-2">
                  <BiArrowBack />Back to signUp
                </p>
                    
              </div>
    
              <button 
              onClick={() => dispatch(sendOtp(signUpData.email, setShowSignUpForm),setOtp(""))}
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

export default VerifyEmailPage