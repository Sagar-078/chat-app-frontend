import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { apiconnecter } from '../../services/apiconnecter';

import { chatEndPoint } from '../../services/apis';
import UserImageModal from './UserImageModal';
import { useNavigate } from 'react-router-dom';
const { CREATECHAT_API } = chatEndPoint;

const UserSec = ({all, token, setOpen, setKeyword, setNevgated, navigated}) => {

    const [imageModal, setImageModal] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    // err check
    async function clickHandler () {

        try{

            const userId = all._id;
            // console.log(userId);

            setOpen(false);
            const response = await apiconnecter("POST", CREATECHAT_API, {"friendId":userId},{
              Authorization: `Bearer ${token}`
            });

            navigate(`/dashboard/${response?.data?.chatId}`);
            setNevgated(true)
            setKeyword("");
        }catch(error){
            console.log("err while creating chat =>>", error);
        }

    }
    
  return (

    <>
        <div  className=' bg-gray-700 px-1 pl-2 py-2 rounded-lg flex 
            text-xl items-center hover:bg-gray-900
            hover:scale-[0.97] transition-all cursor-pointer w-[370px] max-[400px]:w-[90vw]'
        >  

            <img src={all.profile} 
            alt=''
            className=' rounded-full h-[65px] w-[65px]'
                onClick={() => {
                setOpenModal(true);
                setImageModal({
                    image: `${all.profile}`,
                    name: `${all.name}`
                })
            }}/>
        
            <div className=' flex items-center w-full justify-between' onClick={clickHandler}>
                <div className='flex items-center pl-2'>

                    <div >
                        {
                            all.name
                        }
                    </div>
                </div>

                <div className=' flex '>
                    <IoIosArrowForward />
                </div>
            </div>

        </div>

        {
            openModal && (
                // <ImageModal imageModalData={imageModal} openModal={openModal}/>
                <UserImageModal imageModalData={imageModal} setOpenModal={setOpenModal}/>
            )
        }

    </>

  )
}

export default UserSec