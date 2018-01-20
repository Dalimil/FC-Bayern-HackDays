import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.speak('Hello World');
  }

  speak(text) {
    window.responsiveVoice.speak(text, "UK English Male");
  }

  getChatbotReply(text) {
    return "cool";
  }

  ask(text) {
    if (!text) {
      console.warn("you didn't say anything");
      return;
    }
    const response = this.getChatbotReply(text);
    this.speak(response);
  }

  render() {
    return (
      <div>
        <div id="message">
          <h2>Welcome FC Bayern Fans</h2>
          <h1>Talk to us...</h1>
          <textarea ref={node => this.textareaNode = node} autofocus></textarea>
          <p>Your football player will talk back...</p>
          <a href="#" onClick={() => this.ask(this.textareaNode.value)}>Speak</a>
        </div>
        <p id="load">Thank you for supporting us. FC Bayern Munich</p>
      </div>
    );
  }
}

export default App;
