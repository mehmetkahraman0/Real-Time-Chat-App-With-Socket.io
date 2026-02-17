import { io } from "socket.io-client";

const socket = io("https://api.mehmetkahraman.me", {
  transports: ["websocket"],
});

export default socket;