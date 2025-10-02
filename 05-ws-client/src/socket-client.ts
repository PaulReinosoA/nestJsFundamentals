import { Manager, Socket } from 'socket.io-client';

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:88/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token,
    },
  });
  const socket = manager.socket('/');

  addlistener(socket);
};

const addlistener = (socket: Socket) => {
  const serverStatus = document.querySelector('#server-status');
  if (!serverStatus) return;

  //todo clients-ul
  const clientsUl = document.querySelector('#clients-ul');
  if (!clientsUl) return;

  const messagesUl = document.querySelector('#messages-ul');
  if (!messagesUl) return;

  const messageForm = document.querySelector<HTMLElement>('#message-form');
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input');

  socket.on('connect', () => {
    serverStatus.innerHTML = 'Connected';
    serverStatus.classList.add('text-green-500');
    serverStatus.classList.remove('text-red-500');
  });
  socket.on('disconnect', () => {
    serverStatus.innerHTML = 'Disconnected';
    serverStatus.classList.add('text-red-500');
    serverStatus.classList.remove('text-green-500');
  });

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = '';
    console.log(clients);
    clients.forEach((clientId) => {
      clientsHtml += `<li>${clientId}</li>`;
    });
    clientsUl.innerHTML = clientsHtml;
  });

  messageForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageInput!.value.trim().length <= 0) return;
    // const message = messageInput!.value;
    // console.log({ id: 'yo', message: messageInput!.value });
    socket.emit('message-from-client', {
      id: 'yo',
      message: messageInput!.value,
    });
    messageInput!.value = '';
  });

  socket.on(
    'message-from-server',
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>
    `;
      const li = document.createElement('li');
      li.innerHTML = newMessage;
      messagesUl.appendChild(li);
    }
  );
};
