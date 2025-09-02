import { createServer } from "http";
import { Server } from "socket.io";
import express from "express"
import cors from "cors";
import connectedDb from "./config/mongoDb.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import roomRouter from "./routers/roomRouter.js";
import chanelRouter from "./routers/chanelRouter.js";
import Message from "./models/Message.js";
import messageRouter from "./routers/messageRouter.js";

export const app = express()

//dotenv.config();
connectedDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
})

io.on("connection", async (socket) => {
    console.log("Socket ID", socket.id)

    socket.on("joinRoom", (roomId) => {
        console.log("kullancının katıldığı oda ID'si", roomId)
        socket.join(roomId)
    })

    socket.on("sendMessage", async ({ userId, roomId, message, username }) => {
        try {
            const newMessage = await Message.create({ userId, roomId, message , username})
            console.log("message", newMessage)
            io.to(roomId).emit("newMessage", newMessage)
        } catch (e) {
            console.error("mesaj gönderme hatası :", e)
        }
    })
})

app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRouter)
app.use("/api/room", roomRouter)
app.use("/api/chanel", chanelRouter)
app.use("/api/message", messageRouter)


server.listen(3000, () => {
    console.log("app is listening ...")
})