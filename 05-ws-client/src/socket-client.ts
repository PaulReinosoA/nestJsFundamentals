import { Manager } from 'socket.io-client';
export const connectToServer = () => {
  const manager = new Manager('http://localhost:88/socket.io/socket.io.js');
  const socket = manager.socket('/');

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('message', (data) => {
    console.log('Message from server:', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
};
