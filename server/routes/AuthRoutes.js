import { Router } from "express";
import { signup, login, getUserInfo, updateProfile } from "../controllers/AuthController.js"; 
import verifyToken from "../middlewares/verifyToken.js";

const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyToken,getUserInfo);
authRoutes.post('/update-profile',verifyToken, updateProfile);


export default authRoutes;