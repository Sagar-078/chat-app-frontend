import React from 'react'

const Loader = () => {
  return (
    <div className=' inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-700 bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]'>
        <div className='spinner flex absolute justify-center items-center'></div>
    </div>
  )
}

export default Loader