import { io } from "socket.io-client";

const socket = io("https://api.mehmetkahraman.me", {
    // Kimlik bilgilerini (cookie, auth headers) iletmek için şart
    withCredentials: true,
    
    // Bağlantı yöntemlerini açıkça belirt
    // Önce WebSocket denemesini zorlamak bağlantı hızını artırır ve CORS sorunlarını azaltır
    transports: ["websocket", "polling"],
    
    // Bağlantı koparsa otomatik tekrar dene
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;