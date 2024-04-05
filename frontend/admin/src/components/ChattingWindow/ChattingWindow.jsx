/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'

function ChattingWindow({ socket, active, name }) {
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

                const msgs = chats.map((msg) => {

                    if (msg.sender === active) {
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
    }, [socket, active])


    const handleMessageChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        let date = new Date()
        socket.emit('chat message', { recipientId: active, message: newMessage, date })
        setMessages([...messages, { senderStatus: true, message: newMessage, date }])
        setNewMessage("")
    }
    return (
        <main className='col-8'>
            <header>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt />
                <div>
                    <h2>{name}</h2>
                    <h3>online</h3>
                </div>

            </header>
            <ul id="chat">

                {
                    messages.map((msg) => {
                        if (!msg.senderStatus) {
                            return (
                                <li className="you">
                                    <div className="entete">
                                        <span className="status green" />
                                        <h2>{name}</h2> &nbsp;
                                        <h3>{new Date(msg.date).toDateString()}, {new Date(msg.date).toLocaleTimeString('en-US', { hour12: true })}</h3>
                                    </div>
                                    <div className="triangle" />
                                    <div className="message">
                                        {
                                            msg.message
                                        }
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li className="me">
                                    <div className="entete">
                                        <h3>{new Date(msg.date).toDateString()}, {new Date(msg.date).toLocaleTimeString('en-US', { hour12: true })}</h3>
                                        &nbsp;<h2>You</h2>
                                        <span className="status blue" />
                                    </div>
                                    <div className="triangle" />
                                    <div className="message">
                                        {
                                            msg.message
                                        }
                                    </div>
                                </li>
                            )
                        }
                    })
                }



            </ul>
            <footer className='d-flex gap-4'>
                <textarea placeholder="Type your message" value={newMessage} className='col-9' onChange={handleMessageChange} />
                <button className='col-2 btn btn-success' onClick={handleSubmit}>send</button>


            </footer>
        </main>
    )
}

export default ChattingWindow