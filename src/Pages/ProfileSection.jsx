import React, { useRef, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import {useDispatch} from 'react-redux';
import { updateDisplayPicture } from '../services/operations/editApi';
import UpdatePassword from '../Components/ProfileComponents/UpdatePassword';
import DeleteAccount from '../Components/ProfileComponents/DeleteAccount';
import ImageModal from '../Components/DashboardComponents/ImageModal';

const ProfileSection = () => {

  const {user} = useSelector((state) => state.user);
  const {token} = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);
  const [imageModal, setImageModal] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const fileInputRef = useRef();

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
      formData.append("profile", image);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      })

    }catch(error){
        console.log("error while uploade image =>>", error);
    }

  }


  return (
    <div className=' bg-zinc-700 w-[100vw] pb-8'>

      <nav className='Navbackground'>
        <Link to={"/dashboard"}>
          <div className='flex items-center gap-2 p-4 text-white text-base font-bold cursor-pointer'>
            <IoMdArrowRoundBack />
            Back
          </div>
        </Link>
      </nav>

      <div className='flex items-center justify-between rounded-md border-[1px] border-zinc-400 bg-zinc-800 p-8 px-12 text-white mt-8 w-10/12 mx-auto max-md:w-full'>
        <div className=' flex items-center gap-x-4 max-md:items-start max-md:justify-start'>

          <img src={previewSource|| user.profile || user} alt='' 
          className=' rounded-full cursor-pointer  max-md:h-[80px] max-md:w-[85px] h-[100px] w-[105px] p-1 border-[2px] border-green-400 object-cover'
            onClick={() => {
              setOpen(true);
              setImageModal({
                image: `${user.profile}`
              })
            }}  />

          <div className="space-y-6">
            <div className='felx flex-col gap-2'>
            <p className=' text-slate-400'>Change Profile Picture</p>
            <p className=' text-sm text-slate-500'>{user.name}</p>
            </div>
            <div className="flex flex-row gap-3">
              <input
                type='file' ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />

              <div className='flex flex-row items-baseline gap-6 max-md:gap-5 max-md:flex-col'>

                <button onClick={handleClick} disabled={loading}
                  className="cursor-pointer rounded-md bg-zinc-800 py-2 px-5 font-semibold text-zinc-400 border-[1px] border-gray-600 max-md:px-10"
                >
                  Select
                </button>
                <button className=' text-zinc-400 flex gap-2 button-85 max-md:gap-0'
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
      </div>

      <UpdatePassword/>

      <DeleteAccount/>

      {
        open &&(
          <ImageModal imageModalData={imageModal} setOpen={setOpen}/>
        )
      }
      

    </div>
  )
}

export default ProfileSection