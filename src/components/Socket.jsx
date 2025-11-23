import { io } from "socket.io-client";

const socket = io("ticio-backend-production-e1f0.up.railway.app", {
  transports: ["polling","websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default socket;
