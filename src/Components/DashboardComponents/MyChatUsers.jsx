import React, { useEffect, useState } from 'react'
import { apiconnecter } from '../../services/apiconnecter';
import { chatEndPoint } from '../../services/apis';
import { useSelector } from 'react-redux';
import ChatUser from './ChatUser';
import { useNavigate } from 'react-router-dom';
const {GETCHATOFUSER_API} = chatEndPoint;

const MyChatUsers = ({setNevgated}) => {

    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth);
    const [myChatUser, setMyChatUser] = useState([]);
    const [createdUser, setCreatedUser] = useState();
    const navigate = useNavigate();

    const {socket} = useSelector((state)=>state.socket);

    async function fetchAllChat(){
        try{
 
            setLoading(true);

            const response = await apiconnecter("GET", `${GETCHATOFUSER_API}`, null,{
                Authorization: `Bearer ${token}`
            })

            // console.log(" responnse of fetch all chat ---///", response);

            setMyChatUser(response.data.chats);

            setLoading(false);

        }catch(err){
            console.log("error at get chat of a user",err);
        }
    }
    // socket.on('sidebarUpdated',(chat)=>{
    //     setMyChatUser([chat, ...myChatUser])
    // });
    // socket.on('chatDeleted',(chatId)=>{
    //     setMyChatUser((prev)=>{
    //         return prev.filter((chat)=>chat._id!==chatId);
    //     })
    // })
    useEffect(() => {
        fetchAllChat();
        socket.on('sidebarUpdated', (chat) => {
            // console.log("chat at side bar =////", chat);
            setMyChatUser((prev) => [chat, ...prev]);
        });

        socket.on('chatDeleted',(chatId)=>{
            // console.log(" chat id at delete chat ---", chatId);
            setMyChatUser((prev)=>{
                return prev.filter((chat)=>chat._id!==chatId);
            })
            navigate("/");
        })

        return () => {
            socket.off('sidebarUpdated');
            socket.off('chatDeleted');
        }
    }, [socket]);
  return (
    <div className=' flex text-white pt-8 pl-16 max-md:pl-4 max-sm:pl-8 max-h-[calc(100%-15%)] overflow-y-scroll pr-8 max-sm:pr-5 pb-12'>
        
        {
            loading ? (
                <div className='spinner'></div>  
            ) 
            : 
            (
                <div className=' flex w-full flex-col gap-7 h-full pb-10'>
                    {
                        myChatUser.length !== 0 ? 
                        (
                            myChatUser.map((myChat, i) => {
                                return (
                                    <ChatUser myChat={myChat} key={i} token={token}
                                    createdUser={createdUser} setCreatedUser={setCreatedUser}
                                    setNevgated={setNevgated}
                                    />
                                )
                            })
                        ) 
                        : 
                        (
                            <h1 className='flex h-full w-full self-center items-center justify-center font-semibold capitalize text-center text-pretty text-lg text-sky-300'>Please click top-left button & make friends</h1>
                        )
                    }
                    
                </div>
            )
        }
    </div>
  )
}

export default MyChatUsers