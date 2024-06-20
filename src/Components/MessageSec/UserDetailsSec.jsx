import React, { useRef, useState } from 'react'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import useOnClickOutside from '../../hooks/useOnclickOutside';
import Modalinfo from '../Modals/GroupModal/Modalinfo';
import { IoMdInformationCircle } from "react-icons/io";
import { MdGroups2 } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import AddToGroupModal from '../Modals/GroupModal/AddToGroupModal';
import RemoveFromGroupModal from '../Modals/GroupModal/RemoveFromGroupModal';
import ExitFromGroupModal from '../Modals/GroupModal/ExitFromGroupModal';
import OneUserInfoModal from '../Modals/One&oneModal/OneUserInfoModal';
import DeleteChatModal from '../Modals/One&oneModal/DeleteChatModal';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const UserDetailsSec = ({details}) => {
  // console.log("details =???", details);

  const ref = useRef(null);

  useOnClickOutside(ref, ()=> setOpen(false));

  const [open, setOpen] = useState(false);
  const [groupInfoModal, setGroupInfoModal] = useState(false);
  const [addToGroupMemb, setAddToGroupMemb] = useState(false);
  const [removeGroupMember, setRemoveGroupMemb] = useState(false);
  const [exitFromGroup, setExitFromGroup] = useState(false);
  const [oneUserInfo, setOneUserInfo] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  return (
    <div className=''>
      <div className='pt-4 pl-8 max-sm:pl-4 top-0'>
        <div className=' flex justify-between w-full'>
          <div className='w-full flex gap-5 max-sm:gap-2'>

            <div className=' text-3xl max-sm:text-xl block sm:hidden pt-4 max-sm:pt-6 text-gray-400'
              onClick={() => navigate("/")}
            >
              <IoMdArrowRoundBack />
            </div>

            <div className= 'flex justify-center items-center rounded-full'>

              {
                loading &&
                <div className=" h-[80px] w-[83px] border-[0.5px] border-zinc-500 rounded-full flex justify-center items-center">
                  <div className='loader flex items-center justify-center'></div>
                </div>
              }

              <img src= {details?.isGroupChat === true ? (details?.groupIcon) : (details?.users[0]?.profile)}
                alt='' className={`rounded-full object-cover border-[3px] max-sm:border-[2px] border-green-600 h-[80px] max-sm:h-[60px] w-[83px] max-sm:w-[60px] p-1 max-sm:p-[0.1] ${loading ? " hidden" : ""}`}
                onLoad={() => setLoading(false)}
              />
            </div>

            <div className='text-white capitalize text-lg font-semibold pt-10 max-sm:pt-5'>

              {
                loading &&
                <div ></div>
              }

              <h1 className={`${loading ? "hidden" : ""}`} onLoad={() => setLoading(false)}>
                {`${details?.isGroupChat === true ? (details?.chatName) : (details?.users[0]?.name)}`}
              </h1>
            </div>
          </div>

          <div className=' text-white text-3xl max-sm:text-2xl pt-6 pr-6 flex cursor-pointer'>
            <PiDotsThreeOutlineVerticalDuotone onClick={() => setOpen(true)}/>

            {
              open && (
                <div onClick={(e) => e.stopPropagation()}
                  className=" absolute text-white w-36 top-[18%] right-[5%] z-[100000] overflow-hidden rounded border-[1.5px] border-zinc-700 bg-zinc-800"                    
                  ref={ref}
                >

                  {
                    details?.isGroupChat === true ? 
                    (
                      <div className='flex p-1 gap-3 flex-col divide-y-[1.5px] divide-zinc-700 text-base'>
                        
                        <button onClick={() => {
                          setGroupInfoModal(true)
                          setOpen(false)
                        } } 
                          className=' flex items-center gap-1'>
                          Group info
                          <IoMdInformationCircle className=' font-bold text-lg text-slate-500'/>
                        </button>

                        <button className=' flex items-center gap-1'

                        onClick={() => {
                          setAddToGroupMemb(true)
                          setOpen(false)
                        }}
                        >
                          Add to Group
                          <div className='flex items-center text-slate-500'>
                            <MdGroups2 className=' text-lg'/> 
                            <FaPlus className=' text-xs' />
                          </div>
                        </button>

                        <button className='flex items-center gap-1'
                          onClick={() => {
                            setRemoveGroupMemb(true)
                            setOpen(false)
                          }}
                        >
                          Remove User
                          <div className='flex items-center text-slate-500'>
                            <MdGroups2 className=' text-lg'/>
                            <FaMinus className=' text-xs'/>
                          </div>
                        </button>

                        <button className=' flex items-center gap-1'
                          onClick={() => {
                            setExitFromGroup(true)
                            setOpen(false)
                          }}
                        >
                          Exit group
                          <MdExitToApp className=' text-slate-500 text-lg'/>
                        </button>
                      </div>
                    ) 
                    : 
                    (
                      <div className='flex p-1 gap-3 flex-col divide-y-[1.5px] divide-zinc-700 text-base'>
                        
                        <button 
                         onClick={() => {
                          setOneUserInfo(true)
                          setOpen(false)
                         }}
                        >
                          User info
                        </button>
                        
                        <button
                          onClick={() => {
                            setDeleteChat(true)
                            setOpen(false)
                          }}
                        >
                          Delete Chat
                        </button>
                        
                      </div>
                    )
                  }  
                  
                </div>

              )
            }

          </div>
        </div>
        
      </div>
      {
        groupInfoModal && (
          
          <Modalinfo details={details} setGroupInfoModal={setGroupInfoModal}/>
          
        )
      }
      {
        addToGroupMemb && (

          <AddToGroupModal details={details} setAddToGroupMemb={setAddToGroupMemb}/>

        )
      }
      {
        removeGroupMember && (
          <RemoveFromGroupModal details={details} setRemoveGroupMemb={setRemoveGroupMemb}/>
        )
      }
      {
        exitFromGroup && (
          <ExitFromGroupModal details={details} setExitFromGroup={setExitFromGroup}/>
        )
      }
      {
        oneUserInfo && (
          <OneUserInfoModal details={details} setOneUserInfo={setOneUserInfo}/>
        )
      }
      {
        deleteChat && (
          <DeleteChatModal details={details} setDeleteChat={setDeleteChat}/>
        )
      }
    </div>
  )
}

export default UserDetailsSec