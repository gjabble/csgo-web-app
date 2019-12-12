import React from 'react';

const Messages = ({ messages }) => {
  const messageList = messages.map((message) => {
    return (
      <li key={1}>{message.message}</li>
    )
  });

  return (
    <div>
      <ul>{messageList}</ul>
    </div>
  )
}

export default Messages;