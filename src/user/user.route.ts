import {Router , Request , Response , NextFunction} from "express";
import {getUser} from "./user.service"

const router = Router();



//login
router.get("/"  , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const userId:number = req.user?.id!
        const response = await getUser(userId);
        res.status(200).json(response); 
    } catch (error) {
        return next(error) 
    }
});

export default router;