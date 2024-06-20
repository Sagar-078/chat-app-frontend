import React from 'react'

const UserImageModal = ({imageModalData, setOpenModal}) => {
  // console.log("image modal data ", imageModalData);

  // const [loading, setLoading] = useState(true);

  return (
    <div className="fixed inset-0 z-50 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
        <div className="w-11/12 max-w-[350px] max-sm:w-full rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
          <div className='flex flex-col gap-7 items-center justify-center'>
            
              
            <img src={imageModalData?.image} alt='' 
            className={` rounded-md max-w-[300px] max-sm:w-full `}
            />

            <div className='flex justify-center text-wrap text-xl text-blue-300 capitalize'>
              {
                imageModalData.name
              }
            </div>
            
            <button onClick={() => setOpenModal(false)} className='button-85 px-9 py-2 text-lg'>
              Close
            </button>

          </div>
        </div>
    </div>
  )
}

export default UserImageModal