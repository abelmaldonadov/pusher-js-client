import './App.css';
import {useEffect, useState} from "react";
import Pusher from "pusher-js";

function App() {
  const [messages, setMessages] = useState([])
  const [channelId, setChannelId] = useState('')
  const [isSubscribed, setSubscriber] = useState(false)

  useEffect(() => {
    return () => {
      const id = prompt("Ingrese su ID de canal")
      subscribe(id)
    }
  }, [])

  const subscribe = (id) => {
    const pusher = new Pusher("2b64658bcea9de650324", {
      cluster: "sa1",
    })

    // Liberar canal
    pusher.unsubscribe(id)

    // Subscribirse
    const channel = pusher.subscribe(id);
    channel.bind('send-message', function(data) {
      alert(JSON.stringify(data))
      setMessages([...messages, JSON.stringify(data)])
    });
    setChannelId(id)
    setSubscriber(true)
  }

  return (
    <div className="App">
      <h5 style={{color: isSubscribed?"green":"red"}}>{isSubscribed?"Subscrito":"No Subscrito"}</h5>
      <h5>Id: {channelId}</h5>
      <hr/>
      {messages.map(item => <p>{item}</p>)}
    </div>
  );
}

export default App;
