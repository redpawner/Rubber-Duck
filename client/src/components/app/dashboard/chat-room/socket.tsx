//@ts-nocheck
import io from 'socket.io-client';

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const socket = io(BACKEND_PORT, {
  transports: ['websocket'],
});

export default socket;
