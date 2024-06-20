import {toast} from 'react-hot-toast';
import { apiconnecter } from '../apiconnecter';
import {authEndPoint, chatEndPoint, userEndPoint} from '../apis';
import { setUser } from '../../Slices/userSlice';
import { logout } from './authApi';

const { UPDATEPROFILE_API, DELETEACCOUNT_API } = userEndPoint;
const { CHANGE_PASSWORD_API } = authEndPoint;
const {UPDATEGROUPICON_API} = chatEndPoint

export function updateDisplayPicture(token, formData){

    return async(dispatch) => {
        const toastId = toast.loading('Uploading...', {
            id: 'loading',
        });

        try{

            const response = await apiconnecter("PUT", UPDATEPROFILE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            dispatch(
                setUser(response.data.updatedProfile)
            )

        }catch(error){

            console.log("err while updated profile =>> ", error);
            toast.error(error.response.data.message);

        }

        toast.dismiss(toastId);

    }

}

/////
export function updateGroupIcon(formData,token){
    return async(dispatch) => {
        const toastId = toast.loading('Uploading...', {
            id: 'loading',
        });

        try{

            const response = await apiconnecter("POST", UPDATEGROUPICON_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);


        }catch(error){

            console.log("err while updated group idon =>> ", error);
            toast.error(error.response.data.message);

        }

        toast.dismiss(toastId);

    }
}


export async function changePassword(token, formData){
    const toastId = toast.loading('Processing...', {
        id: 'loading',
    });

    try{

        const response = await apiconnecter("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.message){
            throw new Error(response.data.message);
        }

        toast.success(response.data.message);

    }catch(err){

        console.log("err while change password =>>>", err);
        toast.error(err.response.data.message);

    }

    toast.dismiss(toastId);

}

export async function deleteAccount(token, navigate){
    return async(dispatch) => {
        const toastId = toast.loading('Please Wait...', {
            id: 'loading',
        });

        try{
            const response = await apiconnecter("DELETE", DELETEACCOUNT_API, null,{
                Authorization: `Bearer ${token}`
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            dispatch(logout(navigate));

        }catch(error){

            console.log("err while deleteing acc or profile =>>", error);
            toast.error(error.response.data.message);

        }

        toast.dismiss(toastId);

    }
}