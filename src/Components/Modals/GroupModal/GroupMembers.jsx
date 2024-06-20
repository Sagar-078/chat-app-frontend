import React from 'react'

const GroupMembers = ({details}) => {

  return (
    <div>
        <h1 className=' text-white'>Group Members</h1>
        <div className='text-white h-[150px] overflow-y-scroll pt-2'>
            {
                details.users.map((user, i) => {
                    return(
                        <div className=' p-1 ' key={i}>
                            <div className=' flex flex-row items-center gap-3 pl-5 p-1 border-[0.5px] border-zinc-400 rounded-md' >
                                <div>
                                    <img src={user.profile} className='h-10 w-10 rounded-full object-cover'/>
                                </div>
                                <div key={i}>
                                    <p className=' text-slate-400'>{user.name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default GroupMembers