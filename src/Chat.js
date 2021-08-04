import React, { useState , useEffect } from "react";
import axios from "axios";

import "./style.css";
import Messages from "./Messages";

const Chat = props => {
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = message => {
    const data = {
      message
    };

    axios
      .post("https://node-backend.herokuapp.com/chatbot", data)
      .then(response => {
        const responseData = {
          text: response.data["message"]["fulfillmentText"] !== "" ? response.data["message"]["fulfillmentText"] : "Sorry, I can't get it. Can you please repeat once?",
          isBot: true
        };

        setResponses(responses => [...responses, responseData]);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const handleMessageChange = event => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = event => {
    const message = {
      text: currentMessage,
      isBot: false
    };
    if (event.key === "Enter") {
      setResponses(responses => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    }
    
  };

//   React.componentDidMount=()=>{
//       console.log("component did mount ran");
//   };

useEffect(() => {
    showNotification();
    })

    navigator.serviceWorker.register('./sw.js')
    function showNotification(){
        console.log('function called');
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
            // this.addEventListener("visibilitychange",()=>{
                // setTimeout(()=>{
                  if(document.visibilityState==='hidden'){
                    navigator.serviceWorker.ready.then(function(registration) {
                      registration.showNotification('Message from admin', {
                        body: 'Hey!!! Why did you left us, come back you have a new message'
                      });
                    });
                  }
                  else{
                      console.log("page is not hidden");
                  }
                // },2000);
            //   })
        }
      });
    //   return;
    }

  return (
    <div className="chatSection">
      <div className="botContainer">
        <div className="messagesContainer">
          <Messages messages={responses} />
        </div>

        {/*The input section is 👇*/}
        <div className="inputSection">
          <input
            type="text"
            value={currentMessage}
            onChange={handleMessageChange}
            onKeyDown={handleSubmit}
            placeholder="Say something..."
            className="messageInputField"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;