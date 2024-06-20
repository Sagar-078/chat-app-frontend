import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { setSignUpData } from '../Slices/AuthSlices';
import { sendOtp } from '../services/operations/authApi';

const SignUpForm = ({setShowLogin, setShowSignUpForm}) => {

    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const {name, email, password, confirmPassword} = formData;

    const handleOnChange = (e) =>{
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Password Do Not Metch");
            return;
        }

        const signUpData = {
            ...formData
        };

        dispatch(setSignUpData(signUpData));

        dispatch(sendOtp(formData.email, setShowSignUpForm))

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

    }


  return (
    <div className='backgroung max-md:w-[340px] w-[400px] rounded-md py-4 flex flex-col justify-center items-center'>
        
        {
            loading ? (<div className='flex justify-center items-center spinner h-12 w-12'></div>) : 
            (
                <div>
                    <h1 className=' font-mono font-bold text-center text-gray-500 text-lg'>Sign Up</h1>

                    <form className="flex w-full flex-col items-center gap-y-2"
                        onSubmit={handleOnSubmit}>


                        <label className='w-[90%]'>

                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                            Full Name <sup className="text-pink-400">*</sup>
                            </p>

                            <input required type="text" name="name" placeholder="Enter full name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            value={name} onChange={handleOnChange}
                            className="w-full rounded-[0.5rem] backgroung p-[10px] text-white
                            placeholder:text-white"
                            />

                        </label>

                        <label className='w-[90%]'>

                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                                Email Address <sup className="text-pink-400">*</sup>
                            </p>

                            <input required type="text" name="email" 
                            placeholder="Enter email address"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            value={email} onChange={handleOnChange}
                            className="w-full rounded-[0.5rem] backgroung p-[10px] text-white
                            placeholder:text-white"
                            />

                        </label>


                        <div className="flex gap-x-4 w-[90%]">
                            <label className="relative">

                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                                    Create Password <sup className="text-pink-400">*</sup>
                                </p>

                                <input required type={showPassword ? "text" : "password"} name="password"
                                    
                                    placeholder="Enter Password"
                                    style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    value={password} onChange={handleOnChange}
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
                            </label>

                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                                    Confirm Password <sup className="text-pink-400">*</sup>
                                </p>
                                <input required type={showConfirmPassword ? "text" : "password"} name="confirmPassword"

                                    placeholder="Confirm Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    value={confirmPassword} onChange={handleOnChange}
                                    className="w-full rounded-[0.5rem] backgroung p-[12px] pr-10 text-white
                                    placeholder:text-white"
                                />

                                <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer">

                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}

                                </span>
                            </label>
                        </div>

                        <button type="submit"
                            className="button-85 mt-4">
                            Create Account
                        </button>

                    </form>

                    <div className='flex justify-between mx-auto w-[70%] mt-3'>
                        <div>You have Account ?</div>
                        <button onClick={() => setShowLogin(true)}>
                            Sign In
                        </button>
                    </div>
                </div>
            )
        }

    </div>
  )
}

export default SignUpForm