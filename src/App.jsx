import './App.css';
import Home from './Home';
import React, { useState } from 'react';

function App(props) {
  const [message, setMessage] = useState(props.status);

  // This function will be passed to the child
  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  };

  if (message === "home") {
    return (<Home path="/Users" onUpdate={updateMessage}/>);
  } else {
    return (<div>Not Found</div>);
  }
}

export default App
