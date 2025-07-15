import { Router } from "express";
import { signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";  
import { getUserInfo } from "../controllers/AuthController.js"; 
import verifyToken from "../middlewares/verifyToken.js";

const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyToken,getUserInfo);


export default authRoutes;