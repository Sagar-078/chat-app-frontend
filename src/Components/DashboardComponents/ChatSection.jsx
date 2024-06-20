import React, { useState } from 'react';
import chatBgImg from '../../assets/Images/chatBgImg.jpg';
//import { useSelector } from 'react-redux';

const ChatSection = () => {

  const [loading, setLoading] = useState(true);

  return (
    <div className=' max-sm:hidden h-[calc(100vh-10%)] w-[calc(100vw-30%)] max-sm:w-full border-[1px] border-zinc-500 rounded-md'>
      
      {
        loading &&
        <div className=' flex items-center justify-center w-full h-full bg-slate-900'>
          <div className='loader '></div>
        </div>
      }
      
      <img src={chatBgImg} alt='' className={`h-full w-full rounded-md ${loading ? " hidden" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}

export default ChatSection