import React, { useState } from 'react'
import { MdGroups2 } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import GroupCreationModal from './GroupCreationModal';


const CreateGroup = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className='border-b-zinc-500 border-b-2 '>
    
      <div className='flex items-center gap-8 text-white pb-6 pt-6 justify-center '>

        <button className='flex items-center gap-8 max-md:gap-3 max-sm:gap-2'
          onClick={() => setOpen(true)}
        >
          <h1 className='text-2xl max-sm:text-xl max-md:text-xl'>Create New Group</h1>
          
          <button className='flex gap-1 items-center'>
            <MdGroups2 className=' text-4xl'/> <FaPlus className='text-2xl' />
          </button>
        </button>

      </div>

      {
        open && (

          <div onClick={(e) => e.stopPropagation()}
            className=" overflow-hidden overflow-y-hidden 
            rounded-md border-[1px] border-zinc-700 bg-zinc-800"
          >
            <GroupCreationModal setOpen={setOpen}/>
          </div>

        )
      }

    </div>
  )
}

export default CreateGroup