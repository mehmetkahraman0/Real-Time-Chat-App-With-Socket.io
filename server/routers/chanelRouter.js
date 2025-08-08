import express from "express";
import {
    createChanel,
    deleteChanel,
    getAllChanel,
    getChanel,
    getChanelByUser,
    updateChanel
} from "../controllers/chanelController.js";
import {authendicate} from "../middleware/authMiddleware.js";

const chanelRouter = express.Router();

chanelRouter.get("/",getAllChanel);
chanelRouter.get("/:id",getChanel);
chanelRouter.get("/joinedChanel",authendicate, getChanelByUser);
chanelRouter.post("/create",authendicate,createChanel);
chanelRouter.put("/:id",updateChanel);
chanelRouter.delete("/:id",deleteChanel);

export default chanelRouter;