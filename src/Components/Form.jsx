import React, { useState } from 'react'
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import ForgotePassword from "./ForgotePassword";
import VerifyEmailPage from './VerifyEmailPage';
import OtpVerifyPage from './OtpVerifyPage';
import PasswordMetchingField from './PasswordMetchingField';

const Form = () => {

  const [ShowLoginForm, setShowLogin] = useState(false);
  const [showForgotePassPage, setShowForgotePassPage] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [tokenEmailsend, setTokenEmailsend] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isForgoteOtpVerified, setIsForgoteOtpVerified] = useState(false);

  return (
    <div className=' flex flex-col gap-6'>
      <div className='backgroung max-md:w-[340px] w-[400px] h-[60px] max-md:h-[50px] 
      flex justify-center items-center text-2xl font-extrabold text-white rounded-md'>
        cHaT-aPp
      </div>
 
      {
        ShowLoginForm ? 
        (
          showForgotePassPage ? 
          (
            tokenEmailsend ? 
            (
              isForgoteOtpVerified ? 
              (
                <PasswordMetchingField email={email}/>
              ) 
              : 
              (
                <OtpVerifyPage email={email} setEmail={setEmail}
                setTokenEmailsend={setTokenEmailsend} otp={otp} setOtp={setOtp}
                setIsForgoteOtpVerified={setIsForgoteOtpVerified}/>
              )
            ) 
            : 
            (
              <ForgotePassword setShowForgotePassPage={setShowForgotePassPage}
              setTokenEmailsend={setTokenEmailsend} email={email} setEmail={setEmail}/>
            )
          ) 
          : 
          (
            <LoginForm 
            ShowLoginForm={ShowLoginForm} setShowLogin={setShowLogin}
            setShowSignUpForm={setShowSignUpForm} isOtpVerified={isOtpVerified}
            setShowForgotePassPage={setShowForgotePassPage}
            />
          )
        ) 
        : 
        (
          showSignUpForm ? 
          (
            <SignUpForm 
              ShowLoginForm={ShowLoginForm} setShowLogin={setShowLogin}
              setShowSignUpForm={setShowSignUpForm}
            />
          ) 
          : 
          (

            <VerifyEmailPage setShowSignUpForm={setShowSignUpForm}
              setShowLogin={setShowLogin} setIsOtpVerified={setIsOtpVerified}/>
          )
        )
      }

    </div>
  )
}

export default Form