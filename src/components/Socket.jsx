import { io } from "socket.io-client";

const socket = io("https://ticio-backend-production.up.railway.app", {
  transports: ["polling","websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default socket;
