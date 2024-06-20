import React, { useEffect, useRef, useState } from 'react'
import { RiUserSearchLine } from "react-icons/ri";
import useOnClickOutside from '../../hooks/useOnclickOutside';
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { useSelector} from "react-redux";
import UserSec from './UserSec';
import { apiconnecter } from '../../services/apiconnecter';
import { userEndPoint } from "../../services/apis";
const { GETUSERBYSEARCH_API } = userEndPoint;

const UserSearchModal = ({setNevgated, navigated}) => {

    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [allUser, setAllUser] = useState([]);

    const ref = useRef(null);

    const {token} = useSelector((state) => state.auth);

    useOnClickOutside(ref, () => {
        setOpen(false);
        setKeyword("");
    });

    async function handleOnSubmit() {
        
        setLoading(true);

        try{

            const response = await apiconnecter("GET", `${GETUSERBYSEARCH_API}?search=${keyword}`, null,{
                Authorization: `Bearer ${token}`
            });

            setAllUser(response.data.users);
            

        }catch(error){
            console.log("error at search handler =>>", error);
        }
        finally{
            setLoading(false);
        }
    }

    const clickHandler = () => {
        setOpen(false);
        setKeyword("");
    }

    useEffect(() => {
       handleOnSubmit()
    }, []);

  return (
    <div className=' py-3 p-5 text-zinc-400 text-3xl relative'
        onClick={() => setOpen(true)}>
        <button>
            <RiUserSearchLine />
        </button>

        {
            open && (
                <div className=' absolute top-[118%] left-0 z-[1000] divide-y-[2px]
                 divide-zinc-800 overflow-hidden border-[1px] 
                 bg-gray-800 h-[calc(100vh-125%)] w-[400px] max-[400px]:w-[100vw] 
                 overflow-x-hidden duration-700  ' 
                 ref={ref} onClick={(e) =>e.stopPropagation()}>

                    <div className='flex flex-row'>
                        <h1 className=' text-gray-500 font-mono font-semibold p-1'>Search Your Friends</h1>

                        <div className=' absolute right-0 p-2 cursor-pointer'
                            onClick={clickHandler}>
                            <ImCross />
                        </div>
                    </div>

                    <form className='flex flex-row mt-5 p-3 justify-between pr-5'
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleOnSubmit();
                        }}
                        >
                        <input style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            placeholder='Search Frinds By Name Or Email'
                            className="w-[calc(100%-20%)] rounded-[0.5rem] backgroung p-[7px] text-white
                            placeholder:text-sm placeholder:text-zinc-500 text-base"
                            value={keyword} 
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        
                        <button className='button-86 px-3 py-1 text-lg'
                            >
                            <FaSearch />
                        </button>
                    
                    </form>


                    {
                        
                        loading ? (<div className='spinner'></div>) : 
                        (
                            <div className=' py-5 px-2 overflow-y-auto max-h-[calc(100%-15%)]'>
                            { 
                                (
                                    <div className='flex flex-col gap-5 py-3 pl-1'>
                                
                                
                                        <div className='flex flex-col gap-5 py-3 pl-1'>
                                            {
                                                allUser.length !== 0 ? 
                                                (
                                                    allUser.map((all, i) => {
                                                        return(
                                                            <UserSec key={i} all={all} 
                                                                token={token} 
                                                                setOpen={setOpen}
                                                                setKeyword={setKeyword}
                                                                setNevgated={setNevgated} navigated={navigated}
                                                            />
                                                        )
                                                    })
                                                ) : (
                                                    <h1 className=' flex items-center justify-center text-slate-600'>Not Found</h1>
                                                )
                                            }
                                        </div>
                                
                                    </div>
                                )
                            }
                            </div>
                        )
                        
                    }

                    
                </div>
            )
        }
    </div>
  )
}

export default UserSearchModal