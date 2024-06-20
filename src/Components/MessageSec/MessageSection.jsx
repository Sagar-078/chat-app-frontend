import React, { useEffect, useRef, useState } from 'react'
import { BsSend } from 'react-icons/bs';
import { MessageEndPoint } from '../../services/apis';
import { apiconnecter } from '../../services/apiconnecter';
import { useSelector } from 'react-redux';
import {format} from 'date-fns'
const {SENDMESSAGE_API} = MessageEndPoint

const MessageSection = ({messages, chatId, details }) => {

  // console.log("details at message sec =...", details);
  // console.log("messages at message sec ====", messages);

  const [content, setContent] = useState("");
  const { token } = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.user);

  const messageEndRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'PPpp')
  }

  const sendMessage = async(e) => {
    try{
      
      e.preventDefault();
      await apiconnecter("POST", `${SENDMESSAGE_API}`, {
        chatId, content
      }, {
        Authorization: `Bearer ${token}`
      });
      // console.log(".......////>>>", response);

      setContent("");

    }catch(error){

      console.log("error while send message =>>>", error);

    }

  }

  useEffect(() => {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages]);

  return (
    <div className=' h-[calc(100%-25%)] w-full pt-4 pl-8 max-sm:pl-5 pr-8 max-sm:pr-4'>
      <div className=' text-white h-full'>
        <div className='h-full w-full flex justify-center pt-2 pb-1'>
          <div className=' pb-4 w-[calc(100%-10%)]'>
            <div className=' overflow-y-scroll flex flex-col gap-2 h-full'>
              {
                messages.map((message, i) => {
                  return (
                    <div className='flex flex-col ' key={i} >
                      
                      <div 
                        className={`${message.sender._id === user._id ? 
                        (" text-left self-end") : ("flex gap-1 flex-col items-baseline")}`}
                      >

                        <div className=' flex items-baseline gap-1'>
                          {
                            details.isGroupChat === true && (
                              <div>
                                {
                                  message.sender._id !== user._id && (
                                    <img src={`${message.sender.profile}`} 
                                    className=' h-10 w-10 rounded-full'/>
                                  )
                                }
                              </div>
                            )
                          }

                          <div>
                            {
                              details.isGroupChat === true && (
                                message.sender._id !== user._id && (
                                  <h1 className=' font-semibold text-sm'>
                                    {
                                      message.sender.name
                                    }
                                  </h1>
                                )
                              )
                            }
                          </div>

                        </div>

                        <div className={`${message.sender._id === user._id ? (" pl-28 max-sm:pl-16") : ("pr-20 max-sm:pr-11 ")}`}>
                          <div
                          className={`${message.sender._id === user._id ? 
                            ("flex flex-col text-white bg-green-900 text-wrap px-4 py-1 rounded-lg font-semibold self-end text-left w-fit") 
                            : (" bg-gray-700 flex flex-row text-white text-wrap w-fit px-4 py-1 rounded-lg font-semibold")}`}
                          >
                            <div className=' flex flex-col'>
                              {message.content}
                              <div className=' text-xs flex self-end pt-1 pl-3 font-thin'>
                                {
                                  message?.createdAt ? formatDate(message?.createdAt) : ""
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div ref={messageEndRef}/>
            </div>
          </div>
        </div>

      </div>

      <form className=' flex justify-between w-[calc(100%-10%)] pt-4 pb-4 gap-4 max-sm:gap-4 mx-auto px-2 max-sm:px-1'
        onSubmit={sendMessage} 
      >
        <input style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-black p-[10px] text-white
          placeholder:text-white border-[0.5px] border-slate-600"
          placeholder='Send Messagae'
          value={content}
          name='content'
          onChange={(e) => setContent(e.target.value)}

        />

        <button className='button-85 font-extrabold text-lg justify-center
        items-center px-5'>
          <BsSend />
        </button>

      </form>
    </div>
  )
}

export default MessageSection
