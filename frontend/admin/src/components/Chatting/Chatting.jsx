/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import './Chatting.css'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
import { BASEAPIURL } from "../../constants/constant"
import Cookies from 'js-cookie';
import ChattingWindow from '../ChattingWindow/ChattingWindow';
function Chatting() {
    const [socket, setSocket] = useState(null)
    const { name, verified } = useSelector((state) => state.admin)
    const [activeChat, setActiveChat] = useState(null)
    const [activeChatName, setActiveChatName] = useState("")
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        if (verified) {
            setSocket(io(BASEAPIURL, {
                extraHeaders: {
                    Authorization: Cookies.get('token')
                }
            }))
        }
    }, [verified])

    useEffect(() => {
        if (socket) {
            socket.on('usersList', (listUsers) => {
                console.log(listUsers);
                setUsersList((prev) => {
                    return [...listUsers]
                })
            })
        }
        return () => {
            if (socket) {
                socket.off('usersList')
            }
        }
    }, [socket])





    return (
        <div className='pt-4 col-11 m-auto'>
            <div id="container" className='mt-5'>
                <aside className='col-4 pt-4'>

                    <ul>
                        {
                            usersList.map((sender) => {
                                return (
                                    <li onClick={()=>{
                                        setActiveChat(sender.sender)
                                        setActiveChatName(sender.senderName)
                                    }}>
                                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt />
                                        <div>
                                            <h2>{sender.senderName}</h2>
                                            <h3>
                                                <span className="status orange" />
                                                offline
                                            </h3>
                                        </div>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </aside>
                {
                    activeChat &&
                    <ChattingWindow socket={socket} active={activeChat} name={activeChatName} />
                }
            </div>
        </div>



    )
}

export default Chatting