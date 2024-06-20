import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
import { apiconnecter } from '../../services/apiconnecter';
import { chatEndPoint } from '../../services/apis';
import { ImRadioChecked } from "react-icons/im";
import { ImRadioChecked2 } from "react-icons/im";
import toast from 'react-hot-toast';
const {GETCHATOFUSER_API, CREATGROUP_API} = chatEndPoint;

const GroupCreationModal = ({setOpen}) => {

  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const [myChatUsers, setMyChatUsers] = useState([]);
  const [clickedCheckboxes, setClickedCheckboxes] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);


  async function fetchAllChat(){
      
    try{

      setLoading(true);

      const response = await apiconnecter("GET", `${GETCHATOFUSER_API}`, null,{
          Authorization: `Bearer ${token}`
      }) 

      setMyChatUsers(response.data.chats);

      setLoading(false);


    }catch(err){
      console.log("error at get chat of a user",err);
    }
  }

  useEffect(() => { 
    fetchAllChat()
  }, []);

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

    try{

      setLoading(true);
      await apiconnecter("POST", `${CREATGROUP_API}`, {name:groupName, users:groupUsers}, {
        Authorization: `Bearer ${token}`
      })

    }catch(err){
      console.log("error at get chat of a user",err);
      toast.error(err.response.data.message)
    }finally{
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
        <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-4">
          <div className='flex items-center justify-between pb-4'>
            <h1 className='text-white text-2xl'>Create a group</h1>
            <ImCross className='text-white cursor-pointer' onClick={() => setOpen(false)}/>
          </div>

          <form className='flex flex-col gap-4 items-center'
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler()
            }}
          >
            <label className='w-[90%] flex flex-col gap-2'>

              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                Name Of Group <sup className="text-pink-400">*</sup>
              </p>

              <input required type="text" 
                placeholder="Enter name of group"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                value={groupName} onChange={(e) => setGroupName(e.target.value)}
                className="w-full rounded-[0.5rem] backgroung p-[10px] text-white
                  placeholder:text-white"
              />

            </label>

            <div className=' flex flex-col overflow-y-scroll max-h-[200px] w-full'>
              {
                loading ? (<div className='spinner'></div>) 
                : 
                (
                  <div className='flex flex-col gap-1'>
                    {
                      myChatUsers.map((myChat, i) => {
                        return (
                          myChat.isGroupChat === false && 
                          (
                            <div className=' flex justify-between border-[0.5px] items-center rounded-md' key={i}
                            >
                              {
                                <div className=' p-1 rounded-md flex justify-between items-center pr-2'>
                                  <div className=' flex gap-2 items-center '>
                                    <img src={myChat.isGroupChat === false && (myChat.users[0].profile)}
                                      alt="" className="rounded-full h-[50px] w-[52px]"
                                    />
                                    <h1 className=' text-white'>
                                      {
                                        myChat.isGroupChat === false && (<h1>{myChat.users[0].name}</h1>)
                                      }
                                    </h1>
                                  </div>
                                </div>
                                
                              }
  
                              <span onClick={() => handleCheckboxChange(myChat.users[0]._id)} className="cursor-pointer pr-2 text-white">
                                {clickedCheckboxes[myChat.users[0]._id] ? <ImRadioChecked2 fontSize={24} /> : <ImRadioChecked fontSize={24} />}
                              </span>
                            </div>
                          )
                        )
                      })
                    }
                  </div>
                )
              }
            </div>

            <button className='button-85 font-bold w-fit flex items-center justify-center'>
              Create
            </button>

          </form>

        </div>
    </div>
  )
}

export default GroupCreationModal