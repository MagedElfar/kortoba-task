import {Router , Request , Response , NextFunction} from "express";
import {signupValidation , loginValidation , isValidate} from "./../middleware/validators"
import {signup , login} from "./auth.service";

const router = Router();

//login
router.post("/login" , loginValidation , isValidate , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const response = await login(req.body)
        res.status(200).json(response); 
    } catch (error) {
        return next(error) 
    }
});

//signup
router.post("/signup"  , signupValidation , isValidate , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const response = await signup(req.body)
        res.status(201).json(response);
    } catch (error) {
        return next(error)
    }
});


export default router;