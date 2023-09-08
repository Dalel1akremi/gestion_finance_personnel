import express from "express";
import {Login,Register,AjoutDepense,getRecentDepenses} from "../controllers/User.js"
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();

router.post('/Login', Login);
router.post('/Register', Register);
router.post('/AjoutDepense',AjoutDepense);
router.get('/recentDepenses',getRecentDepenses)
// if make private route verify token user before send response must call to verifyToken feature with the intial feature for this route
export default router;