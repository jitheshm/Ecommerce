/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'

function ChattingWindow({ socket, active }) {
    const [messages, setMessages] = useState([{}])
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        if (socket) {

            socket.emit('getpreviousmessages', { userId: active })
            console.log(`message-${active}`);
            socket.on(`message-${active}`, (msgObj) => {
                console.log(`message-${active}`);
                msgObj.senderStatus = false
                setMessages((prev) => {
                    return [...prev, msgObj]
                })
            })

            socket.on('previousmessages', ({ chats }) => {
                console.log(chats);
                const msgs = chats.map((msg) => {
                    console.log(msg.sender, active);
                    if (msg.sender == active) {
                        msg.senderStatus = false
                    }
                    else {
                        msg.senderStatus = true
                    }
                    return msg
                })
                console.log(msgs);
                setMessages(msgs)
            })
        }
        return () => {
            if (socket) {
                socket.off(`message-${active}`)
                socket.off('previousmessages')
            }
        }
    }, [socket])


    const handleMessageChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        let date = new Date()
        socket.emit('chat message', { recipientId: 'admin', message: newMessage, date })
        setMessages([...messages, { senderStatus: true, message: newMessage, date }])
        setNewMessage("")
    }


    return (
        <div className="chatter">
            <div className="chatter_post_signup">
                <div className="chatter_convo">
                    {
                        messages.map((msg) => {
                            if (msg.senderStatus === false) {
                                return (
                                    <div className='col-12 receiver'>
                                        <span className="chatter_msg_item chatter_msg_item_admin">
                                            <a href="https://lukepeters.tech" className="chatter_avatar"><img src="https://img.lukepeters.me/avatar.jpg" /></a>
                                            <strong className="chatter_name">Admin</strong>{msg.message}</span>
                                    </div>
                                )
                            } else if (msg.senderStatus === true) {
                                return (
                                    <div className='col-12 sender'>
                                        <span className="chatter_msg_item chatter_msg_item_user">
                                            <a href="https://lukepeters.tech" className="chatter_avatar"><img src="http://img.lukepeters.me/jack.jpg" /></a>
                                            {msg.message}</span>
                                    </div>
                                )
                            }
                        })
                    }


                </div>
                <div className='row gap-2 justify-content-center'>
                    <textarea name="chatter_message" placeholder="Type your message here..." className="chatter_field chatter_message col-9" value={newMessage} onChange={handleMessageChange} />
                    <button className='btn btn-success col-2' onClick={handleSubmit}>send</button>
                </div>
            </div>
        </div>
    )
}

export default ChattingWindow