import express from "express"

const routers = express.Router()

routers.get("/getalluser", (req, res) => {
    return res.json({ message: "şuan burdasın" })
})

export default routers