import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gazer from './Gazer';
import Tracking from './Tracking';

class App extends Component {

  componentDidMount() {
    // this.speak('Hello World');
  }

  speak(text, alternativeVoice) {
    return new Promise(resolve => {
      const config = {
        //pitch: 2,
        volume: 2,
        onend: resolve
      };
      window.responsiveVoice.speak(text, alternativeVoice ? "UK English Female" : "UK English Male", config);
    });
  }

  getChatbotReply(text) {
    return fetch(`https://api.dialogflow.com/v1/query?v=20170712&query=${window.encodeURI(text)}&lang=en&sessionId=494475ee-8fb6-45ef-8d8a-bcdd255910a6&timezone=Europe/London`, {
      headers: new Headers({
        'Authorization': 'Bearer f1b3acd841674614b971cf20790cb531'
      })
    })
    .then(x => x.json())
    .then(j => j.result.fulfillment.speech);
  }

  ask(textareaNode) {
    const text = textareaNode.value;
    if (!text) {
      console.warn("you didn't say anything");
      return;
    }
    textareaNode.value = "";
    const response = this.getChatbotReply(text);
    this.speak(text, false).then(() => {
      response.then(toSay => this.speak(toSay, true));
    });
  }

  render() {
    return (
      <div>
        <div id="message">
          <h2>Welcome FC Bayern Fans</h2>
          <Gazer />
          <Tracking />
          <h1>Talk to us...</h1>
          <textarea ref={node => this.textareaNode = node} autoFocus></textarea>
          <p>Your football player will talk back...</p>
          <a href="#" onClick={() => this.ask(this.textareaNode)}>Speak</a>
        </div>
        <p id="load">Thank you for supporting us. FC Bayern Munich</p>
        
      </div>
    );
  }
}

export default App;
