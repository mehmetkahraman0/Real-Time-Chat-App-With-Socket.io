import { createServer } from "http";
import { Server } from "socket.io";
import express from "express"
import connectedDb from "./config/mongoDb.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express()

dotenv.config();
connectedDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

io.on("connection", async (socket) => {
    console.log("Socket ID", socket.id)

    socket.on("room", (data) => {
        console.log("room event",data)
        socket.join(data)
    })

    socket.on("message", (data) => {
        console.log("message event",data)
        socket.to(data.room).emit("messageReturn", data)
    })

})

app.use("/api/user", userRouter)

server.listen(3000, () => {
    console.log("app is listening ...")
})