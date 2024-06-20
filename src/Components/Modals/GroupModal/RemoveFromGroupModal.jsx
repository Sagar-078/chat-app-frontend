import React, { useState } from 'react'
import { ImCross, ImRadioChecked, ImRadioChecked2 } from 'react-icons/im'
import { apiconnecter } from '../../../services/apiconnecter';
import { chatEndPoint } from '../../../services/apis';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const {REMOVEFROMGROUP_API} = chatEndPoint

const RemoveFromGroupModal = ({details, setRemoveGroupMemb}) => {

  const {token} = useSelector((state) => state.auth);
  const [clickedCheckboxes, setClickedCheckboxes] = useState(false);
  const [groupUsers, setGroupUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    setClickedCheckboxes((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));

    if(!groupUsers.includes(userId)){
      setGroupUsers([...groupUsers, userId]);
    }else{
      setGroupUsers(
        groupUsers.filter(id => id !== userId)
      )
    }
  };

  async function submitHandler(){
    
    const toastId = toast.loading('Please Wait...', {
      id: 'loading',
    });

    try{

      const response = await apiconnecter("PUT", `${REMOVEFROMGROUP_API}`, 
      {groupId:details._id, userId:groupUsers}, {
        Authorization: `Bearer ${token}`
      })
      // console.log("response of remove from gropup chat =>>", response);

      if(!response.data.success){
        throw new Error(response.data.message);
    }

    toast.success(response.data.message);

    }catch(error){
      console.log("error at remove from group =>>", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    setRemoveGroupMemb(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">

        <div className='flex justify-between items-center text-white'>
          <h1 className=' font-bold capitalize'>
            {details.chatName}
          </h1>
          <button onClick={() => setRemoveGroupMemb(false)}>
            <ImCross />
          </button> 
        </div>   

        <h1 className=' py-2 text-lg font-semibold text-gray-400'>Remove User From This Group</h1>

        <div className=' flex flex-col overflow-y-scroll max-h-[200px] w-full p-2 gap-1'>
          {
            details.users.map((user, i) => {
              return(
                <div className=' flex justify-between border-[0.5px] items-center rounded-md' key={i}>
                  {
                    <div className=' p-1 rounded-md flex justify-between items-center pr-2'>
                      <div className=' flex gap-2 items-center '>
                        <img src={user.profile}
                          alt="" className="rounded-full h-[50px] w-[52px]"
                        />
                        <h1 className=' text-white'>
                          {
                          user.name
                          }
                        </h1>
                      </div>
                    </div>

                  }

                  <span onClick={() => handleCheckboxChange(user._id)} className="cursor-pointer pr-2 text-white">
                    {clickedCheckboxes[user._id] ? <ImRadioChecked2 fontSize={24} /> : <ImRadioChecked fontSize={24} />}
                  </span>

                </div>
              )
            })
          }
        </div>

        <div className=' mt-6 flex justify-center items-center'>
          <button className=' button-85'
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  )
}

export default RemoveFromGroupModal