import {FiTrash2} from "react-icons/fi"
import {useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../DashboardComponents/Modal";
import {toast} from 'react-hot-toast';
import { setToken } from "../../Slices/AuthSlices";
import { setUser } from "../../Slices/userSlice";


import { userEndPoint } from "../../services/apis";
import { apiconnecter } from "../../services/apiconnecter";
const { DELETEACCOUNT_API } = userEndPoint


export default function DeleteAccount(){
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modal, setModal] = useState(null);

    async function handleDeleteAccount(){
        try{

            const toastId = toast.loading('Please Wait...', {
                id: 'loading',
            });

            //dispatch(deleteAccount(token, navigate)); 
            const response = await apiconnecter("DELETE", DELETEACCOUNT_API, null,{
                Authorization: `Bearer ${token}`
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Profile deleted successfully");
            dispatch(setToken(null));
            dispatch(setUser(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");

            toast.dismiss(toastId);

        }catch(err){

            console.log("error while delete account =>>>", err);
            toast.error("Could not delete Account");
        }
    }

    return(
        <>
        
            <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 max-sm:mt-3 w-10/12 mx-auto max-md:w-full">
                <div className="flex aspect-square h-14 w-14 max-sm:h-8 max-sm:w-8 items-center justify-center rounded-full bg-pink-700">
                    <FiTrash2 className="text-3xl text-pink-200" />
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold text-white">
                        Delete Account
                    </h2>
                    <div className="w-3/5 text-pink-300 max-sm:w-full">
                        <p className=" text-pink-300">Would you like to delete account?</p>
                        <p className="text-pink-300">
                        This account may contain important data. Deleting your account is
                        permanent and will remove all the contain associated with it.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-fit cursor-pointer italic text-pink-400"
                        onClick={() => {setModal({
                            text1: "Are You Sure",
                            text2: "Your Account will be delete permanently",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteAccount(),
                            btn2Handler: () => setModal(null),
                        })
                        }}
                    >
                    I want to delete my account.
                    </button>
                </div>
            </div>
        
            {
                modal && <Modal modalData={modal}/>
            }

        </>
    )

}