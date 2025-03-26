import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const employeeName = location.state?.name || `Employee #${id}`;

  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "other" },
    { text: "I need some details about my payroll.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatHeader}>Chat with {employeeName}</h2>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.userMessage : styles.otherMessage
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          className={styles.inputField}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
