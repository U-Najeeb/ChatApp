/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ChatInput.scss";
import { IoMdSend } from "react-icons/io";
const ChatInput = ({ handleMsg }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0) {
      handleMsg(message);
      setMessage("");
    }
  };
  return (
    <div className="chatInput--container">
      <div className="chatInput--wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input--send--box">
            <div className="input--box">
              <input
                type="text"
                name="input--text"
                placeholder="Message"
                className="input"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className="send--button-box">
              <button className="send--button">
                <IoMdSend />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
