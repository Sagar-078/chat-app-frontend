import React from 'react'
import { ImCross } from 'react-icons/im'
import { apiconnecter } from '../../../services/apiconnecter';
import { chatEndPoint } from '../../../services/apis';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const {EXITFROMGROUP_API} = chatEndPoint

const ExitFromGroupModal = ({details, setExitFromGroup}) => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    async function submitHandler() {
        try{

          await apiconnecter("PUT", `${EXITFROMGROUP_API}`,
          {groupId:details._id}, {
              Authorization: `Bearer ${token}`
          })

          navigate(`/dashboard`);

        }catch(error){
            console.log("error at exit from group modal =>>", error);
        }
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">

        <div className='flex justify-between items-center text-white'>
          <h1 className=' font-bold capitalize'>
            {details.chatName}
          </h1>
          <button onClick={() => setExitFromGroup(false)}>
            <ImCross />
          </button> 
        </div>        

        <div className=' flex justify-center flex-col items-center'>
            <p className=' text-red-400 font-bold pt-2 pb-6'>
                Are you sure, you will be exit from this group and can't access message of this group .
            </p>

            <button className=' button-85'
                onClick={submitHandler}
            >
                Confirm 
            </button>
        </div>

      </div>
    </div>
  )
}

export default ExitFromGroupModal