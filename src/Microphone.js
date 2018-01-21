import React from 'react';
import { setTimeout } from 'timers';

class Microphone extends React.Component {

  componentDidMount() {
    setTimeout(() => this.setup(), 2000);
  }

  setup() {
    const artyom = new window.Artyom();

    // Add a single command
    var commandHello = {
        indexes:["hello","good morning","hey"], // These spoken words will trigger the execution of the command
        action:function(){ // Action to be executed when a index match with spoken word
            artyom.say("Hey buddy ! How are you today?");
        }
    };
    artyom.addCommands(commandHello); // Add the command with addCommands method. Now

    // This function activates artyom and will listen and execute only 1 command (for http connections)
    function startOneCommandArtyom(){
      artyom.fatality();// use this to stop any of

      setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
          artyom.initialize({
              lang:"en-GB",// A lot of languages are supported. Read the docs !
              continuous:true,// recognize 1 command and stop listening !
              listen:true, // Start recognizing
              debug:true, // Show everything in the console
              speed:1 // talk normally
          }).then(function(){
              console.log("Ready to work !");
              artyom.say("I'm listening...");
          });
      },250);
    }
    startOneCommandArtyom();
  }

  render() {
    return <div></div>;
  }
}

export default Microphone;
