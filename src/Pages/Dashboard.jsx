import React, { useEffect, useState } from 'react'
import Navbar from '../Components/DashboardComponents/Navbar'
import SideBar from '../Components/DashboardComponents/SideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const {socket} = useSelector((state)=>state.socket);
  const {user} = useSelector((state)=>state.user);

  const [navigated, setNevgated] = useState(false);

  useEffect(()=>{
    if(user?._id){
      // console.log("user id at join user room ", user._id);
      socket.emit("join_user_room",user?._id)
    }
    return () => {
      if(user?._id){
        // console.log("user id at leave user room ", user._id);
        socket.emit("leave_user_room",user?._id)
      }
    }
  },[user, socket])
  return (
    <div className='w-[100vw] h-[100vh] bg-zinc-700 overflow-y-hidden overflow-x-hidden'>
      <div>
        <Navbar setNevgated={setNevgated} navigated={navigated}/>
      </div>
       
      {/* h-full to h-clld */}
      <div className=' h-[calc(100vh-4rem)] w-full flex flex-row pt-4 pl-4 pr-14 gap-8 max-md:gap-4 max-md:pr-5 max-md:pl-3 max-sm:pl-0 max-sm:pr-0'>

        
        <SideBar setNevgated={setNevgated} navigated={navigated}/>
        
        <Outlet />

      </div>

    </div>
  )
}

export default Dashboard