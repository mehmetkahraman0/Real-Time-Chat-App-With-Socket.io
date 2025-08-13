import express from "express"
import {
    getAllUser,
    getCurrentUser,
    getUserById,
    loginUser, logoutUser,
    registerUser,
    updateCurrentUser
} from "../controllers/userController.js";
import {authendicate} from "../middleware/authMiddleware.js";
import {uploadUser} from "../controllers/multerController.js";


const userRouter = express.Router()

userRouter.post("/register",uploadUser,registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout",logoutUser);
userRouter.get("/",authendicate, getCurrentUser);
userRouter.get("/:id", getUserById);
userRouter.get("/users",getAllUser);
userRouter.put("/update",authendicate, updateCurrentUser);

export default userRouter