import { io } from "socket.io-client";

const socket = io("ticio-backend-production.up.railway.app", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default socket;
