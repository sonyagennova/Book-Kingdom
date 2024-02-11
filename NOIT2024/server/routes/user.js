import express from 'express';
import { deleteUser, editUser, getAllUsers, getUserById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/", getAllUsers)

router.get("/:id", getUserById)

router.patch("/edit/:id", editUser)

router.delete("/:id", deleteUser)

export default router;