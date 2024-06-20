import React, { useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { TbMoodEdit } from "react-icons/tb";
import {VscSignOut} from "react-icons/vsc";
import useOnClickOutside from '../../hooks/useOnclickOutside';
import Modal from "./Modal";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import { logout } from '../../services/operations/authApi';

const ProfileDropDown = () => {

    const {user} = useSelector((state) => state.user);

    
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(null);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    useOnClickOutside(ref, ()=> setOpen(false));

    const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    <div className=' '>
        <div className=' relative cursor-pointer' onClick={() => setOpen(true)}>
            <div className='flex items-center justify-center gap-x-1'>

                <div className=' border-[0.7px] rounded-full border-slate-400 h-[50px] w-[53px] flex justify-center items-center'>
                    {
                        loading &&
                        <div className='loader'></div>
                    }

                    <img src={ user.profile} alt='' 
                    className={`rounded-full h-[50px] w-[55px] object-cover ${loading ? " hidden" : ""}`}
                    onLoad={() => setLoading(false)}
                    />
                </div>
                
                <AiOutlineCaretDown className="text-sm text-white" />
            </div>

            {
                open && (
                    <div onClick={(e) => e.stopPropagation()}
                    className="absolute top-[118%] right-0 divide-y-[1px] divide-zinc-700 overflow-hidden rounded-md border-[1px] border-zinc-700 bg-zinc-800"
                    ref={ref}
                    >
                        
                        <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                            <button className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-slate-300 hover:bg-slate-700 hover:text-gray-200"
                            >
                                <TbMoodEdit /> 
                                Edit
                            </button>
                        </Link>

                        <button className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-slate-300 hover:bg-slate-700 hover:text-gray-200"
                            onClick={() => {setModal({
                                text1: "Are You Sure",
                                text2: "You will be logged out of your Account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setModal(null),
                            })
                            setOpen(false)
                            }}     
                        >
                            <VscSignOut className="text-lg" />
                            Logout
                        </button>

                    </div>

                )
            }

        </div>

        {
            modal && <Modal modalData={modal}/>
        }
    </div>
  )
}

export default ProfileDropDown