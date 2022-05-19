import {Router , Request , Response , NextFunction} from "express";
import {productValidation , isValidate} from "./../middleware/validators";
import localUpload from "./../middleware/multer";
import { addProduct , getAllProducts , getProduct , updateProduct , deleteProduct } from "./products.service";
const router = Router();

//add product
router.get("/"   , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const response = await getAllProducts()
        res.status(200).json(response); 
    } catch (error) {
        return next(error) 
    }
});

router.get("/:id"   , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const {id} = req.params
        const response = await getProduct(parseInt(id))
        res.status(200).json(response); 
    } catch (error) {
        return next(error) 
    }
});


router.post("/"  , localUpload() , productValidation , isValidate , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const userId:number = req.user?.id!
        const data = req.body;
        const file = req.file
        const response = await addProduct(userId , data , file)
        res.status(201).json(response); 
    } catch (error) {
        return next(error) 
    }
});

router.put("/:id" , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const {id} = req.params
        const userId:number = req.user?.id!
        const data = req.body;
        const file = req.file;
        const response = await updateProduct(userId , parseInt(id) , data , file)
        res.status(201).json(response); 
    } catch (error) {
        return next(error) 
    }
});

router.delete("/:id" , async (req:Request , res:Response , next:NextFunction) => {
    try {
        const {id} = req.params
        const userId:number = req.user?.id!

        const response = await deleteProduct(userId , parseInt(id))

        res.status(201).json(response); 
    } catch (error) {
        return next(error) 
    }
});

export default router;