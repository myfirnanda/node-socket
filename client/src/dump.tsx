import { useEffect, useState } from 'react';
import './App.css'
import io from 'socket.io-client'
import { users } from './utils/users.js';
import type { User } from './utils/users.js';

const socket = io("http://localhost:8000");

interface ChatMessage {
  email: string;
  message: string;
  sender?: string;
}

const getRandomLoggedInUser = (): User => {
  const randomIndex = Math.floor(Math.random() * users.length);
  (users as User[])[randomIndex].login = true;
  return (users as User[])[randomIndex];
};

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [unread, setUnread] = useState(0);
  const [loggedInUser] = useState<User>(getRandomLoggedInUser);

  const sendMessage = () => {
    if (message.trim() && email) {
      const chatMessage: ChatMessage = {
        email: loggedInUser.email,
        message: message
      };
      
      socket.emit("send_message", chatMessage);
      setChat(prev => [...prev, chatMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: ChatMessage) => {
      setChat(prev => [...prev, data]);

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
    <div className="App my-16">
      <div id="profile" className='text-center text-4xl mb-14'>
        <p>Login as <span className='font-semibold'>{loggedInUser.name}</span></p>
      </div>
      <form className='flex flex-col items-center gap-4 max-w-sm mx-auto'>
        <label htmlFor="receiver" className="block w-full text-start font-medium text-heading">Message to:</label>
        <select 
          id="receiver" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        >
          <option value="" className="bg-neutral-secondary-medium text-heading" disabled>Pilih Penerima</option>
          {users
            .filter(user => user.id !== loggedInUser.id)
            .map(data => (
            <option key={data.id} value={data.email} className="bg-neutral-secondary-medium text-heading">{data.name}</option>
          ))}
        </select>
        <textarea 
          id="message" 
          rows={4} 
          value={message}
          className="w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand p-3.5 shadow-xs placeholder:text-body" 
          placeholder="Write your message here..." 
          onChange={e => setMessage(e.target.value)}
        />
        <button type="button" onClick={sendMessage} className="w-full bg-brand text-white py-2.5 rounded-base hover:bg-brand/90 transition-colors">Send Message</button>
      </form>
      <div id="chatbox" className='max-w-sm mx-auto mt-8 border border-default-medium rounded-base p-4 bg-neutral-secondary-medium'>
        <h4 className='text-heading font-semibold'>Messages:</h4>
        <ul className='space-y-2 flex flex-col'>
          {chat.map((data, index) => {
            const isCurrentUser = data.email === loggedInUser.email;
            
            if (isCurrentUser) {
              return (
                <li key={index} className='flex flex-col items-end gap-1'>
                  <span className='text-xs text-body mt-4'>You</span>
                  <div className='bg-blue-400 rounded-lg text-white px-3 py-2 max-w-[70%]'>{data.message}</div>
                </li>
              );
            } else {
              return (
                <li key={index} className='flex flex-col items-start gap-1'>
                  <span className='text-xs text-body mt-4'>{users.find(u => u.email === data.email)?.name || 'Unknown'}</span>
                  <div className='bg-neutral-secondary-light text-heading px-3 py-2 rounded-lg max-w-[70%]'>{data.message}</div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
