import React, { useEffect, useState } from 'react'
import { ImCross, ImRadioChecked, ImRadioChecked2 } from 'react-icons/im'
import { apiconnecter } from '../../../services/apiconnecter';
import { useSelector } from 'react-redux';
import { chatEndPoint } from '../../../services/apis';

const {SHOWUSERFORADD_API, ADDTOGROUP_API} = chatEndPoint

const AddToGroupModal = ({details, setAddToGroupMemb}) => {
  const [loading,setLoading] = useState(true);
  const [users,setusers] = useState([]);
  const {token} = useSelector((state)=>state.auth)

  const [clickedCheckboxes, setClickedCheckboxes] = useState(false);
  const [groupUsers, setGroupUsers] = useState([]);

  const getOtherUsers = async ()=>{
   try {
    const data =  await apiconnecter('GET',`${SHOWUSERFORADD_API}/${details._id}`,null,{
      Authorization: `Bearer ${token}`
    })
      setusers(data.data.otherusers);
    } catch (error) {
      console.log('Error at adfd to group user',error)
    }finally{
      setLoading(false);
    }
  }

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

  const submitForAdd = async() => {
    try{

      setLoading(true);
      await apiconnecter("PUT", `${ADDTOGROUP_API}`,{groupId:details._id, userId:groupUsers}, {
        Authorization: `Bearer ${token}`
      });
      
      setAddToGroupMemb(false)

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
     getOtherUsers();
  },[details._id])

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
        
        <div className='flex justify-between items-center text-white'>
            <h1 className=' font-bold capitalize'>
              {details.chatName}
            </h1>
            <button onClick={() => setAddToGroupMemb(false)}>
              <ImCross />
            </button> 
        </div>

        <div className=' flex flex-col'>
          
          <h1 className=' flex text-zinc-400 font-semibold pt-4'>Add to group</h1>

          {
            loading ? <div className='spinner'></div> 
            :
            (
              <div className=' flex flex-col pt-3 px-2'>
                <h1 className=' flex text-slate-400 pb-2'>Other user of your Chat</h1>
                <div className='flex flex-col max-h-[200px] overflow-y-scroll pt-1 pb-1'>
                  {
                    users.map((user, i) => {
                      return (
                        <div className=' flex flex-col justify-between w-full py-1.5'>
                          <div className='border-[0.5px] rounded-md flex w-full justify-between items-center py-1 px-1 '>
                            <div className='flex items-center gap-2'>
                              <img src={user.profile} className=' h-12 w-12 rounded-full'/>
                              <h1 className=' text-slate-400'>{user.name}</h1>
                            </div>

                            <span onClick={() => handleCheckboxChange(user._id)} className="cursor-pointer pr-2 text-white">
                              {clickedCheckboxes[user._id] ? <ImRadioChecked2 fontSize={24} /> : <ImRadioChecked fontSize={24} />}
                            </span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                <button onClick={submitForAdd} className='button-85 flex w-fit mt-4 self-center'>
                  Add to Group
                </button>
                
              </div>
            )
          }

        </div>

      </div>
    </div>
  )
}

export default AddToGroupModal