import { io } from "socket.io-client";

const socket = io(
  "https://event.backendportfolio.xyz",
  {
    transports: ["websocket"],
    withCredentials: true,
  }
);

export default socket