import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import connectedDb from "./config/mongoDb.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import roomRouter from "./routers/roomRouter.js";
import chanelRouter from "./routers/chanelRouter.js";
import Message from "./models/Message.js";
import messageRouter from "./routers/messageRouter.js";

dotenv.config();

export const app = express();

connectedDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://real-time-chat-app-with-so-git-643acf-mehmets-projects-b64e4688.vercel.app/",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin) || origin.includes("vercel.app")) {
            return callback(null, true);
        }

        return callback(new Error("CORS blocked"));
    },
    credentials: true,
}));


const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: allowedOrigins.concat(/\.vercel\.app$/),
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
});



io.on("connection", (socket) => {

    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });

    socket.on("sendMessage", async ({ userId, roomId, message, username }) => {
        try {

            const newMessage = await Message.create({
                userId,
                roomId,
                message,
                username
            });

            io.to(roomId).emit("newMessage", newMessage);

        } catch (e) {
            console.error("message error:", e);
        }
    });

});


app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/chanel", chanelRouter);
app.use("/api/message", messageRouter);


const PORT = 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});
