import { useState } from "react";
import UserImageModal from "./UserImageModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {format} from 'date-fns'


const ChatUser = ({myChat, setNevgated}) => {
  // console.log(">>>>>>>>>>>",myChat);

  const navigate = useNavigate();

  const [imageModal, setImageModal] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const {user} = useSelector((state) => state.user);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  async function clickHandler () {

    try{

      navigate(`/dashboard/${myChat._id}`);
      setNevgated(true);

    }catch(error){
      console.log("err while creating chat =>>", error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'PPpp')
  }
  
  return (
    <div className=" flex w-full">
      <div className="flex items-center gap-7 max-[1270px]:gap-4 max-md:gap-2 border-[0.1px] w-full px-3 py-3 bg-gradient-to-b
       bg-slate-600 rounded-lg cursor-pointer"
       onClick={clickHandler}
      >

        <div>

          {
            loading &&
            <div className=" h-[65px] w-[65px] border-[0.3px] border-zinc-500 rounded-full flex justify-center items-center">
              <div className='loader'></div>
            </div>
          }

          <img src={myChat.isGroupChat === true ? (myChat?.groupIcon) : (myChat?.users[0]?.profile)}
            alt="" className={`rounded-full h-[65px] w-[65px] max-[1220px]:h-[50px] max-[1220px]:w-[50px] ${loading ? " hidden" : ""}`}
            onLoad={() => setLoading(false)}
            onClick={() => {
              setOpenModal(true);
              setImageModal({
                image: `${myChat.isGroupChat === true ? (myChat?.groupIcon) : (myChat?.users[0]?.profile)}`,
                name: `${myChat.isGroupChat === true ? (myChat?.chatName) : (myChat?.users[0]?.name)}`
              })
            }}
          />
        </div>

        <div className="">
          <h1>
            {
              myChat.isGroupChat === true ? 
              (<div>
                <h1>{myChat?.chatName}</h1>
                <p className="text-xs text-amber-300">Group Chat</p>
              </div>) 
              : (<h1>{myChat?.users[0]?.name}</h1>)
            }
          </h1>

          <div className="flex truncate text-xs gap-4 items-baseline">
            <div className="flex gap-1 truncate">
              <div>
                {
                  myChat.isGroupChat === true ? 
                  (
                    myChat?.latestMessage?.content && (
                      (myChat?.latestMessage?.sender?._id !== user?._id ? 
                      (
                        <div className=" flex items-center gap-1">
                          <h1>{myChat?.latestMessage?.sender?.name}</h1>
                          <div>:</div>
                        </div>
                      ) : (<div>You :</div>))
                    )
                  )
                  : 
                  (
                    myChat?.latestMessage?.content &&(
                      (myChat?.latestMessage?.sender?._id !== user?._id ? ("") : (<div>You : </div>)) 
                    )
                  )
                }
              </div>
              <div className={`${myChat?.latestMessage?.sender?._id !== user?._id ? (" text-green-300") : (" text-stone-300")}`}>
                {
                  truncateText(myChat?.latestMessage?.content || "", 10)
                }
              </div>
            </div>
          
            <div className={` flex text-xs ${myChat?.latestMessage?.sender?._id !== user?._id ? (" text-green-600") : (" text-stone-400")}`}>
              {
                myChat?.latestMessage?.updatedAt ? formatDate(myChat?.latestMessage?.updatedAt) : ''
              }
            </div>
          
          </div>
        </div>

      </div>

      {
        openModal && (
          <UserImageModal imageModalData={imageModal} setOpenModal={setOpenModal}/>
        )
      }

    </div>
  )
}

export default ChatUser
