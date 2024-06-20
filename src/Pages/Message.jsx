import React, { useEffect, useState } from 'react'
import chatBgImg from '../assets/Images/chatBgImg.jpg';
import { apiconnecter } from '../services/apiconnecter';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MessageEndPoint } from '../services/apis';
import UserDetailsSec from '../Components/MessageSec/UserDetailsSec';
import MessageSection from '../Components/MessageSec/MessageSection';
const { GETCHATDETAILS_API} = MessageEndPoint

const Message = () => {

  const location = useLocation();
  const chatId = location.pathname.split('/').at(-1);

  const [loading, setLoading] = useState(true);
  const [details,setdetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const {socket} = useSelector((state)=>state.socket)
  
  
  const getChatDetails = async ( ) =>{
    try {
      const responce = await apiconnecter('GET',`${GETCHATDETAILS_API}/${chatId}`,null,{
        Authorization: `Bearer ${token}`
      })

      setdetails(responce.data?.chatdetails);
      setMessages(responce.data?.prevmessages);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  socket.on("message_received",(message)=>{
    setMessages([...messages,message])
 })

  useEffect(() => {
    getChatDetails();
    if(chatId){
       socket.emit("join_chatId",chatId);
    }
    return () =>{
       socket.emit("leave_chatId",chatId);
    }
  }, [chatId]);

  return (
 //// h-full
    <div className=' h-full w-[calc(100vw-20%)] max-sm:w-full border-[1px] border-zinc-500 rounded-md bg-zinc-900'>
      
      {
        loading ? 
        (<div className=' h-full w-full flex justify-center items-center'>
          <div className='spinner h-14 w-14 '></div>
        </div>)
        : 
        (
           
          <div className=' bg-center  h-full w-full rounded-md'
            style={{ backgroundImage: `url(${chatBgImg})`}}
          >
            {/* <img src={chatBgImg} alt='' className=' absolute inset-0 h-full w-full rounded-md '/> */}
        
            <div className=' w-full h-full'>

              <UserDetailsSec details={details}/>
         
              <MessageSection messages={messages} details={details} chatId={chatId}/>

            </div>

          </div>
        )
      }

    </div>
  )
}

export default Message;
