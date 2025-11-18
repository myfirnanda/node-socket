import { useEffect, useState } from 'react';
import './App.css'
import io from 'socket.io-client'

const socket = io("http://localhost:8000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [unread, setUnread] = useState(0);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", data => {
      setChat(prev => [...prev, data.message]);

      if (!document.hasFocus()) {
        setUnread(prev => prev + 1);
      }
    });

    return () => { socket.off("receive_message"); };
  }, []);

  useEffect(() => {
    const handleFocus = () => setUnread(0);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    if (unread > 0) {
      document.title = `(${unread}) New Message`;
    } else {
      document.title = "Chat App";
    }
  }, [unread]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h4>Message:</h4>
      <ul>
        {chat.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
