import React, { useState } from 'react'
import CreateGroup from './CreateGroup';
import MyChatUsers from './MyChatUsers';

const SideBar = ({setNevgated, navigated}) => {

  return (
    <div className={`h-[calc(100vh-10%)] w-[calc(100vw-60%)]
      ${navigated ? (" max-sm:hidden") : ("")}
     max-sm:w-full border-[1px]
     border-zinc-500 rounded-md bg-zinc-800 flex flex-col`}>

      <CreateGroup/>

      <MyChatUsers setNevgated={setNevgated}/>

    </div>
  )
}

export default SideBar