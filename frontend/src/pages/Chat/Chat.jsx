/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoutes } from "../../utils/apiRoutes";
import "./Chat.scss";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";
import ChatContainer from "../../components/ChatContainer/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);
  

  useEffect(() => {
    const autoLogin = async () => {
      if (!localStorage.getItem("current--user")) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem("current--user"));
        setCurrentUser(user);

        const token = user.token;
        try {
          const response = await axios.get(allUsersRoutes, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching contacts:", error.message);
        }
      }
    };

    autoLogin();
  }, [currentUser.token, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container className="chat--container">
      <div className="chat--wrapper">
        <Contacts Contacts={contacts} currentUser={currentUser} chatChange={handleChatChange} />
        {!currentChat ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} />}
      </div>
    </Container>
  );
};

const Container = styled.div``;

export default Chat;
