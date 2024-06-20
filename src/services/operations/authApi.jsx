import {toast} from "react-hot-toast"
import { authEndPoint, userEndPoint} from "../apis"
import { setLoading, setToken } from "../../Slices/AuthSlices";
import { setUser } from "../../Slices/userSlice";
import { apiconnecter } from "../apiconnecter";

const {SENDOTP_API, SIGNUP_API, LOGIN_API} = authEndPoint;
const {SENDFORGOTEPASSTOKEN_API, VERIFYFORGOTEPASSOTP_API, FORGOTEPASSWORDUPDATE_API} = userEndPoint;

export function sendOtp(email, setShowSignUpForm){
    // console.log(email, setShowSignUpForm);
    return async (dispatch) => {
        const toastId = toast.loading("Sending Otp...", {
            id: "loading",
        });
        dispatch(setLoading(true));
        try{
            // console.log("api is ", SENDOTP_API);
            const response = await apiconnecter("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });


            if(!response.data.success){
                throw new Error(response.data.message);
            }


            toast.success(response.data.message);
            setShowSignUpForm(false);

        }catch(error){
            console.log("error while send otp err =>", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function signUp(name, email, password, confirmPassword, otp, setShowLogin) {

    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...", {
            id: "loading", 
        });

        dispatch(setLoading(true));

        try{

            const response = await apiconnecter("POST", SIGNUP_API, {
                name, email, password, confirmPassword, otp
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            setShowLogin(true);

        }catch(error){

            // console.log("error while sign up =>>", error);

            toast.error(error.response.data.message);

            setShowLogin(false);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }

}


export function login(email, password, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...", {
            id: "loading", 
        });

        dispatch(setLoading(true));

        try{

            var response = await apiconnecter("POST", LOGIN_API, {
                email, password
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.profile ? response.data.user.profile :
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.profile}`

            dispatch(setUser({...response.data.user, profile: userImage}));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard");

        }catch(error){

            console.log("error at login api =>>", error);
            toast.error(error.response.data.message);

        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}



export function sendForgotePasswordToken(email, setTokenEmailsend){
    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...", {
            id: "loading"
        });

        dispatch(setLoading(true));

        try{

            const response = await apiconnecter("POST", SENDFORGOTEPASSTOKEN_API, {
                email
            });

            if(!response.data.success){

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            setTokenEmailsend(true);

        }catch(error){

            console.log("error while email reset token send =>>", error);

            toast.error(error.response.data.message);

        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }
}


export function verifyForgoteOtp(email, otp, setIsForgoteOtpVerified){

    return async(dispatch) => {
        const toastId = toast.loading("Loading...", {
            id: "loading"
        });

        dispatch(setLoading(true));

        try{

            const response = await apiconnecter("POST", VERIFYFORGOTEPASSOTP_API, {
                email, otp
            });

            if(!response.data.success){

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);
            setIsForgoteOtpVerified(true);
            

        }catch(error){

            console.log("error while verify forgote password otp =>>", error);

            toast.error(error.response.data.message);

        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }

}


export function forgotePasswordUpdate(email, password, confirmPassword, navigate){

    return async(dispatch) => {

        const toastId = toast.loading("Processing...", {
            id: "loading"
        });

        dispatch(setLoading(true));

        try{

            const response = await apiconnecter("POST", FORGOTEPASSWORDUPDATE_API, {
                email, password, confirmPassword
            });

            if(!response.data.success){

                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            navigate("/dashboard");

        }catch(error){

            console.log("error while update password =>>", error);

            toast.error(error.response.data.message);

        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}


// for logout
export function logout(navigate){
    return(dispatch) =>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/");
    }
}