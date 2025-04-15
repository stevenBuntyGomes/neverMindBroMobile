import { io } from "socket.io-client";
let socket;

export const initializeSocket = (ENDPOINT) => {
  if (!socket) {
    socket = io(ENDPOINT, { transports: ['websocket'] });
    console.log('Socket initialized:', socket);
  }
  // console.log('Socket initialized:', socket);
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    // throw new Error('Socket not initialized. Call initializeSocket first.');
    console.log('Socket not initialized. Call initializeSocket first.');
  }
  console.log('socket connected');
  return socket;
};
