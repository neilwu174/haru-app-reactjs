import './App.css';
import Home from './Home';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function App(props) {
  const [userData, setUserData] = useState(props.userData);

  // This function will be passed to the child
  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  if (userData.route === "home") {
    return (<Home path="/Users" onUpdate={updateUserData}/>);
  } else {
    // return (<div>{userData.path}</div>);
    return (
      <div className="container">
        <video width="%100" height="%100" controls>
          <source src="http://localhost:8080/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}

export default App
