/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Contacts.scss";
import { styled } from "styled-components";
import { useEffect, useState } from "react";

const Contacts = ({ Contacts, currentUser, chatChange }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    setCurrentUserName(currentUser.username);
    setCurrentUserImage(currentUser.avatarImage);
  }, [currentUser]);

  const handleSelectedChat = (index, contact) => {
    setSelectedChat(index)
    chatChange(contact)
  }
  return (
    <>
      {currentUserName && currentUserImage && (
        <Container className="contacts--container">
          <div className="contacts--wrapper">
            <div className="brand">
              <h3 className="logo">Talky</h3>
            </div>
            <div className="contacts">
              {Contacts?.users?.map((contact, index) => (
                <div
                  className={`contact ${
                    index === selectedChat ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectedChat(index, contact)} 
                >
                  <div className="avatar">
                    <img src={contact.avatarImage} alt=""  />
                  </div>
                  <div className="contact--username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="current--user">
              <div className="current--user-avatar">
                <img
                  src={currentUser.avatarImage}
                  alt=""
                />
              </div>
              <div className="current--user-username">
                <h1>{currentUser.username}</h1>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div``;

export default Contacts;
