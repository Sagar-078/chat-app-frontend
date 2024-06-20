import React from 'react'

const ImageModal = ({imageModalData, setOpen}) => {

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
        <div className="w-11/12 max-w-[350px] max-sm:w-full rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
            <div className='flex flex-col gap-7 items-center justify-center'>
                <img src={imageModalData.image} alt='' className=' max-w-[300px] max-sm:w-full'/>

                <button onClick={() => setOpen(false)} className='button-85'>
                    Close
                </button>

            </div>
        </div>
    </div>
  )
}

export default ImageModal