import React from 'react'
import { SiMessenger } from "react-icons/si";
import ProfileDropDown from './ProfileDropDown';
import UserSearchModal from './UserSearchModal';

const Navbar = ({setNevgated, navigated}) => {

  return (
    <nav className='Navbackground flex items-center justify-between'>
        
        <UserSearchModal setNevgated={setNevgated} navigated={navigated}/>

        <div>
            <h1 className='text-zinc-400 font-bold font-mono text-3xl max-sm:invisible'>cHaT-aPp</h1>
        </div>

        <div className=' flex flex-row gap-7 pr-14 items-center max-sm:pr-4'>

            <div>
                <SiMessenger className=' text-2xl'/>
            </div>

            <div className=' relative'>
                <ProfileDropDown/>
            </div>

        </div>

    </nav>
  )
}

export default Navbar