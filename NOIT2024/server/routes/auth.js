import express from "express";
import { login, logout, register, registerAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)

router.post("/login", login)

router.get("/logout", logout)

router.post("/register-admin", registerAdmin)

export default router;