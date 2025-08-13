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
import {uploadChanel} from "../controllers/multerController.js";

const chanelRouter = express.Router();

chanelRouter.get("/",getAllChanel);
chanelRouter.get("/:id",getChanel);
chanelRouter.get("/joinedChanel",authendicate, getChanelByUser);
chanelRouter.post("/create",authendicate,uploadChanel,createChanel);
chanelRouter.put("/:id",uploadChanel,updateChanel);
chanelRouter.delete("/:id",deleteChanel);

export default chanelRouter;