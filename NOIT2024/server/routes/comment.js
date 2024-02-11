import express from "express";
import { CreateCollectionItem, deleteOneItem, GetAllItems, GetOneItem, PartiallyUpdateOneItem, UpdateOneItem } from "../controllers/comment.controller.js";


const router = express.Router();

router.post("/create", CreateCollectionItem);
router.get("/", GetAllItems)
router.get("/:id", GetOneItem)
router.put("/:id", UpdateOneItem)
router.patch("/:id", PartiallyUpdateOneItem)
router.delete("/:id", deleteOneItem)

export default router;