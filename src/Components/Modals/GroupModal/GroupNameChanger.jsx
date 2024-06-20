import React, { useState } from 'react'
import { apiconnecter } from '../../../services/apiconnecter';
import { chatEndPoint } from '../../../services/apis';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const {UPDATEGROUPNAME_API, setGroupInfoModal} = chatEndPoint

const GroupNameChanger = ({details }) => {

  const {token} = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  // console.log("name at group name change =>>", name);

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{

      const toastId = toast.loading('Please Wait...', {
        id: 'loading',
      });

      await apiconnecter("PUT", `${UPDATEGROUPNAME_API}`, {chatId:details._id, chatName:name},{
        Authorization: `Bearer ${token}`
      })

      toast.dismiss(toastId);
      toast.success("Groupname updated successfully");

    }catch(error){

      console.log("error at group name change =>", error);
    }
  }

  return (
    <div className=' pt-3'>

      <h1 className=' text-white text-sm'>
        Change Your Group Name
      </h1>

      <form className='flex gap-3 flex-col pt-2'
        onSubmit={handleOnSubmit}
      >
        <input
          required type="text" name="name" value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new Group name"
          style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] backgroung p-[10px] text-white
          placeholder:text-white"
        />

        <button className='button-85 w-fit flex self-end'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default GroupNameChanger