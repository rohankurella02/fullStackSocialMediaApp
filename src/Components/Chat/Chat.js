import React from 'react'
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room, chat, setChat }) {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit('send_message', messageData);
            setMessages((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((list) => [...list, data]);
            console.log('i fire once')
        })
    }, []);

    return (
        <div style={{marginTop: "10px"}} className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
                {/* <p style={{color: "white"}} onClick={setChat(true)} >Back</p> */}
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messages.map((messageContent, index) => {
                        return (
                            <div
                                className="message"
                                key={index}
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{username === messageContent.author ? "You" : messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button style={{color: "green"}} onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat