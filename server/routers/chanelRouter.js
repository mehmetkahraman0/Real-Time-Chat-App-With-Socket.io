import express from "express";
import {
    addUserInChanel,
    createChanel,
    deleteChanel,
    getAllChanel,
    getChanel,
    getChanelByUser,
    updateChanel, 
    userJoinWithInvetiCode,
    deleteUserInChanel,
    deleteRoomInChanel,
    createInviteCodeInChanel
} from "../controllers/chanelController.js";
import {authendicate} from "../middleware/authMiddleware.js";
import {uploadChanel} from "../controllers/multerController.js";
import userRouter from "./userRouter.js";

const chanelRouter = express.Router();

chanelRouter.get("/", getAllChanel);
chanelRouter.get("/:id", getChanel);
chanelRouter.get("/join/joinedchanel", authendicate, getChanelByUser);
chanelRouter.post("/create", authendicate, uploadChanel, createChanel);
chanelRouter.put("/:id", uploadChanel, updateChanel);
chanelRouter.put("/add/:id", addUserInChanel);
chanelRouter.delete("/:id", deleteChanel);
chanelRouter.post("/join",authendicate,userJoinWithInvetiCode);
chanelRouter.post("/delete/:id",authendicate,deleteUserInChanel);
chanelRouter.post("/delete/room/:id",authendicate,deleteRoomInChanel);
chanelRouter.post("/create/invitecode", createInviteCodeInChanel)

export default chanelRouter;