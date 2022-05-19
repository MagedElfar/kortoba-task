import {Router} from "express";
import auth from "./../auth/auth.route"
const router = Router();


//const {authMiddleware , authUserTypeMiddleware} = require("./../middleware/token");

router.use(auth)

export default router; 