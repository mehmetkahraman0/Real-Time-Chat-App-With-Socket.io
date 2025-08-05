import { createServer } from "http";
import { Server } from "socket.io";
import express from "express"

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

// app.use("/user", userRouter)

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

server.listen(3000, () => {
    console.log("app is listening ...")
})