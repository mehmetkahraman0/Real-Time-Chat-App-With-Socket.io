import express from "express"
import {getAllUser, getCurrentUser, loginUser, registerUser, updateCurrentUser} from "../controllers/userController.js";
import {authendicate} from "../middleware/authMiddleware.js";


const userRouter = express.Router()

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/",authendicate, getCurrentUser);
userRouter.get("/users",getAllUser);
userRouter.put("/update",authendicate, updateCurrentUser);

export default userRouter