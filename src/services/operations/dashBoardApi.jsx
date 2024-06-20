import { userEndPoint} from "../apis"
import { setLoading } from "../../Slices/AuthSlices";
import { apiconnecter } from "../apiconnecter";

const {GETUSERBYSEARCH_API, GETUSERARRAY_API} = userEndPoint; 

// err is here check 
export function getUserBySearch(token, params, setResults) {
    return async(dispatch) => {

        dispatch(setLoading(true));

        try{

            const response = await apiconnecter("GET", GETUSERBYSEARCH_API, params,{ 
                Authorization: `Bearer ${token}`
            });

            setResults(response.data.users);

            if(!response.data.success){

                throw new Error(response.data.message);
            }

        }catch(error){
            console.log("error while email reset token send =>>", error);
        }

        dispatch(setLoading(false));

    }
}


// err is here check
export function getAllUsersArr(token, setAllUser){
    return async(dispatch) => {

        dispatch(setLoading(true));

        try{

            await apiconnecter("GET", GETUSERARRAY_API, token,{
                Authorization: `Bearer ${token}`
            });

            setAllUser(response.data);

        }catch(error){
            console.log("error while get all users arr =>>", error);
        }
        dispatch(setLoading(false));
    }
}