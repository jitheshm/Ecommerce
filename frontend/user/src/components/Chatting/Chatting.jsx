import React, { useEffect, useState } from 'react'
import './Chatting.css'
import { io } from "socket.io-client";
import { BASEAPIURL } from "../../constants/constant"
import ChattingWindow from '../ChattingWindow/ChattingWindow';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
function Chatting() {
    const [showChat, setShowChat] = useState(false)
    const [socket, setSocket] = useState(null)
    const { name, verified } = useSelector((state) => state.user)
    const [active, setActive] = useState(null)
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
            socket.on('adminId', (active) => {
                setActive(active)
            })
        }

        return () => {
            if (socket) {
                socket.off('adminId')
            }
        }
    }, [socket])

    return (
        <>
            {
                verified &&
                <div>
                    {
                        showChat ?
                            <ChattingWindow socket={socket} active={active} />
                            :null
                            
                    }
                    <div className='chat-button' onClick={() => {
                        setShowChat((prev)=>!prev)
                    }}>
                        <i className="fa-solid fa-message" />

                    </div>

                </div>
            }

        </>
    )
}

export default Chatting