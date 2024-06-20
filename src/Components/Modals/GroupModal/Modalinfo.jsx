import React, { useRef, useState } from 'react'
import { ImCross } from "react-icons/im";
import {useDispatch, useSelector} from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import { updateGroupIcon } from '../../../services/operations/editApi';
import GroupNameChanger from './GroupNameChanger';
import GroupMembers from './GroupMembers';

const Modalinfo = ({details, setGroupInfoModal}) => {

  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
    
  }


  const handleFileChange = (e) => {

    const file = e.target.files[0]

    if(file){
      setImage(file);
      previewFile(file);
    }

  }

  const handleFileUpload = () => {

    try{

      setLoading(true);
      const formData = new FormData();
      formData.append("groupIcon", image);
      formData.append("chatId", details._id);
      dispatch(updateGroupIcon(formData,token)).then(() => {
        setLoading(false);
      })

    }catch(error){
        console.log("error while uploade image =>>", error);
    }

  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
        
        <div>
          <div className='flex justify-between items-center text-white'>
            <h1 className=' font-bold capitalize'>
              {details.chatName}
            </h1>
            <button onClick={() => setGroupInfoModal(false)}>
              <ImCross />
            </button>
          </div>

          <div className=' flex items-center gap-x-4 max-md:items-start max-md:justify-start'>

            <img src={previewSource || details.groupIcon} alt='' 
            className=' rounded-full cursor-pointer  max-md:h-[80px] max-md:w-[85px] h-[100px] w-[105px] p-1 border-[2px] border-green-400 object-cover'
            />

            <div className="space-y-6">
              <div className='felx flex-col gap-2'>
                <p className=' text-white'>Change Group Icon</p>
                <p className=' text-sm text-slate-500'>{details.chatName}</p>
              </div>
              <div className="flex flex-row gap-3">
                <input
                  type='file' ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
                />

                <div className='flex flex-row items-baseline gap-3 max-md:gap-5 max-md:flex-col'>

                  <button onClick={handleClick} disabled={loading}
                    className="cursor-pointer rounded-md bg-zinc-800 py-2 px-4 font-semibold text-zinc-400 border-[1px] border-gray-600 max-md:px-10"
                  >
                    Select
                  </button>
                  <button className=' text-zinc-400 flex gap-2 button-85 max-md:gap-0 px-3'
                    onClick={handleFileUpload}
                  >
                    {!loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                    )}

                    {loading ? "Uploading..." : "Upload"}

                  </button>

                </div>
                  
              </div>  
            </div>

          </div>

          <GroupNameChanger details={details} setGroupInfoModal={setGroupInfoModal}/>

          <GroupMembers details={details}/>

        </div>

      </div>
    </div>
  )
}

export default Modalinfo