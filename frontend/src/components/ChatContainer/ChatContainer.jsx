/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./ChatContainer.scss";
import Logout from "../LogoutButton/Logout";
import ChatInput from "../ChatInput/ChatInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { addMessageRoute, getAllMessages } from "../../utils/apiRoutes";
import { io } from "socket.io-client";
const socket = io("https://chat-app-server-woad-alpha.vercel.app/");

const ChatContainer = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };
    socket.on("receive-message", handleReceiveMessage);

    socket.on("connect", ()=>{
      console.log("User COnnected")
    })

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.on("disconnect", ()=>{
        console.log("disconnected")
      })
    };
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(
          getAllMessages,
          { id: currentChat._id },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setMessages(response?.data?.message);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentChat._id, currentUser.token]);

  const handleMessage = async (msg) => {
    try {
      await axios.post(
        addMessageRoute,
        { msg, id: currentChat._id, sender: currentUser._id },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: msg, id: currentChat._id, sender: currentUser._id },
      ]);

      socket.emit("send-message", {
        message: msg,
        id: currentChat._id,
        sender: currentUser._id,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chats--container">
      <div className="chats--wrapper">
        <div className="chat--header">
          <div className="user--details">
            <div className="avatar">
              <img src={currentChat.avatarImage} alt="avatar" />
            </div>

            <div className="username--box">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>

        <div className="chat--messages">
          {messages.map((message, index) => (
            <div
              className={`message--container ${
                currentUser._id === message.sender ? "me" : "other"
              }`}
              key={index}
            >
              <div className="message--wrapper">
                <p className={`message`}>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="chat--input">
          <ChatInput handleMsg={handleMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
