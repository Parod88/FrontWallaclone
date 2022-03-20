import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ChatUsersOnline.scss';

function ChatUsersOnline({ onlineUsers, currentUserId, setcurrentConversation }) {
  const [vendors, setVendors] = useState([]);
  const [onlineVendors, setOnlineVendors] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/v1/chat/conversation/' + currentUserId
        );
        console.log('www', res.data.results);
        res.data.results.map((conversation) =>
          setVendors((prev) => [...prev, conversation.members[1]])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUserId]);

  useEffect(() => {
    let uniqueVendors = [...new Set(vendors)];

    setOnlineVendors(uniqueVendors.filter((f) => onlineUsers.includes(f._id)));
  }, [vendors, onlineUsers]);

  const handleInitConversation = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/chat/conversation/${currentUserId}/${user._id}`
      );
      setcurrentConversation(res.data);
      console.log('www', res.data.results);
      res.data.results.map((conversation) =>
        setVendors((prev) => [...prev, conversation.members[1]])
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="chat-users-online">
      {/* {JSON.stringify(vendors)} */}
      {onlineUsers.map((user) => (
        <div onClick={() => handleInitConversation(user)}>
          <div className="avatar">
            <img src="https://i.pravatar.cc/500" alt="" />
            <div className="user-badge" />
          </div>
          <div>{user.name}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatUsersOnline;