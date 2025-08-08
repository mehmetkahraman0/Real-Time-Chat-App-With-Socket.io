import express from "express";
import {createRoom, deleteRoom, getAllRoom, getRoom, updateRoom} from "../controllers/roomController.js";
import room from "../models/Room.js";

const roomRouter = express.Router();

roomRouter.get("/:id",getRoom)
roomRouter.get("/rooms",getAllRoom)
roomRouter.post("/create",createRoom)
roomRouter.put("/:id",updateRoom)
roomRouter.delete("/:id",deleteRoom)

export default roomRouter