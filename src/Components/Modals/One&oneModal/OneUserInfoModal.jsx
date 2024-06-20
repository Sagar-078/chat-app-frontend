import React from 'react'
import { ImCross } from 'react-icons/im'

const OneUserInfoModal = ({details, setOneUserInfo}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
        
        <div className='flex justify-between items-center text-white'>
          <h1 className=' font-bold capitalize'>
            {details.users[0].name}
          </h1>
          <button onClick={() => setOneUserInfo(false)}>
            <ImCross />
          </button> 
        </div>

        <div className=' flex flex-col items-center gap-6'>
          <img src={details.users[0].profile} alt='' className=' h-36 w-36 rounded-full object-cover'/>
        
          <h1 className=' text-lg capitalize font-bold text-slate-500'>{details.users[0].name}</h1>

        </div>

      </div>
    </div>
  )
}

export default OneUserInfoModal