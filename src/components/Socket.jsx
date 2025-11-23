import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default socket;
