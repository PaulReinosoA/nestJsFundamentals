import './style.css';
import { setupCounter } from './counter.ts';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - online</h1>
    <span id="server-status">Connecting...</span>

    <ul id="clients-ul">      
    </ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type your message..." />
      <button type="submit">Send</button>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul">
    </ul>

  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
connectToServer();
