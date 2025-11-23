import { io } from "socket.io-client";

const socket = io("https://tic-io-backend.vercel.app/", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default socket;
