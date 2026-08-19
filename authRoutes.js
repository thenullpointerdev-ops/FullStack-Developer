import express from "express"; // we change in package.json "type": "module" to use import instead of require
import { register,login, logout } from "../controllers/authControllers.js";

const router = express.Router(); // create an instance of express router

router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout);

export default router; // export the router to be used in other files





