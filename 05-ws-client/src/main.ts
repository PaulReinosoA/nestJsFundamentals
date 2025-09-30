import './style.css';
import { setupCounter } from './counter.ts';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket - online</h1>
  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
connectToServer();
