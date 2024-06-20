import React from 'react'
import { ImCross } from 'react-icons/im'
import { apiconnecter } from '../../../services/apiconnecter'
import { chatEndPoint } from '../../../services/apis'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const {DELETECHAT_API} = chatEndPoint

const DeleteChatModal = ({details, setDeleteChat}) => {
  const {token} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  async function submitHandler() {
    try{

      await apiconnecter("PUT", `${DELETECHAT_API}`, {chatId:details._id}, 
      {
        Authorization: `Bearer ${token}`
      })

      setDeleteChat(false);

      navigate("/");
      

    }catch(error){
      console.log("error at delete chat =///", error);
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
        
        <div className='flex justify-between items-center text-white'>
            <h1 className=' font-bold capitalize'>
              {details.users[0].name}
            </h1>
            <button onClick={() => setDeleteChat(false)}>
              <ImCross />
            </button> 
        </div>

        <div className=' flex gap-6 flex-col justify-center items-center'>
            <h1 className=' pt-3 text-red-300'>
                Are you sure, it will be remove all the chat and all messages from both side.
            </h1>

            <button className=' button-85'
              onClick={submitHandler}
            >
              Delete
            </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteChatModal