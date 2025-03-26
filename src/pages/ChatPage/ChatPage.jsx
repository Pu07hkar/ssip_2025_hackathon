import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaPaperPlane, FaPaperclip, FaSmile, FaEllipsisV } from 'react-icons/fa';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const { employeeId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockEmployee = {
      id: employeeId,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      profilePicture: null,
      status: 'Active'
    };
    setEmployee(mockEmployee);
    setLoading(false);
  }, [employeeId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>
        <div className={styles.employeeInfo}>
          <div className={styles.profilePicture}>
            {employee?.profilePicture ? (
              <img src={employee.profilePicture} alt={employee.name} />
            ) : (
              <FaUser className={styles.defaultAvatar} />
            )}
          </div>
          <div className={styles.employeeDetails}>
            <h2>{employee?.name}</h2>
            <span className={styles.status}>{employee?.status}</span>
          </div>
        </div>
        <button className={styles.menuButton}>
          <FaEllipsisV />
        </button>
      </div>

      <div className={styles.chatMessages}>
        {messages.map(message => (
          <div
            key={message.id}
            className={`${styles.message} ${message.sender === 'user' ? styles.sent : styles.received}`}
          >
            <div className={styles.messageContent}>
              {message.text}
            </div>
            <div className={styles.messageTime}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.messageInput} onSubmit={handleSendMessage}>
        <button type="button" className={styles.attachButton}>
          <FaPaperclip />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button type="button" className={styles.emojiButton}>
          <FaSmile />
        </button>
        <button type="submit" className={styles.sendButton}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatPage; 