import express from 'express'
import {getMessage} from "../controllers/messageController.js";
import {authendicate} from "../middleware/authMiddleware.js";

const messageRouter = express.Router()

messageRouter.get('/', authendicate, getMessage)

export default messageRouter