import { useState } from "react";
import {useForm} from "react-hook-form"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useSelector } from "react-redux";
import { changePassword } from "../../services/operations/editApi";


export default function UpdatePassword() {
    
    const {token} = useSelector((state) => state.auth);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {register, handleSubmit, formState:{errors}} = useForm()


    const submitPasswordForm = async(data) => {
        try{

            await changePassword(token, data);

        }catch(error){

            console.log("err while submit password form =>>", error);

        }
    }


    return(
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            <div className="flex justify-between rounded-md border-[1px] border-zinc-400 bg-zinc-800 p-8 px-12 text-white mt-16 max-sm:mt-3 w-10/12 mx-auto max-md:w-full flex-col">
                <h2 className="text-lg font-semibold text-white pb-6">Change Password</h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="oldPassword" className="text-[14px] text-white">
                            Current Password
                        </label>
                        <input 
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter Current Password"
                            className="rounded-lg backgroung p-3 text-[16px] leading-[24px] text-white shadow-[0_1px_0_0] shadow-white/50 placeholder:text-zinc-600 focus:outline-none"
                            {...register("oldPassword", {required: true})}
                        />
                        <span
                            onClick={() => setShowOldPassword((pre) => !pre)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showOldPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                : 
                                (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                            }
                        </span>

                        {
                            errors.oldPassword && (
                                <span>
                                    Please enter your current password
                                </span>
                            )
                        }

                    </div>

                    <div className="relative flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="newPassword" className="text-[14px] text-white">
                            New Password
                        </label>
                        <input 
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            className="rounded-lg backgroung p-3 text-[16px] leading-[24px] text-white shadow-[0_1px_0_0] shadow-white/50 placeholder:text-zinc-600 focus:outline-none"
                            {...register("newPassword", {required: true})}
                        />
                        <span
                            onClick={() => setShowNewPassword((pre) => !pre)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showNewPassword ? 
                                (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                : 
                                (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                            }
                        </span>

                        {
                            errors.showNewPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your current password
                                </span>
                            )
                        }

                    </div>

                </div>

                <div className="flex justify-end gap-2 pt-10 pr-6">

                    <button type="submit" className="button-85">Update</button>

                </div>

            </div>

        </form>
    )


}