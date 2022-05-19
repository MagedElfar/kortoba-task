import {Router} from "express";
import authMiddleware from "./../middleware/token";
import auth from "./../auth/auth.route";
import users from "./../user/user.route";
import products from "./../products/products.route"

const router = Router();

router.use(auth)
router.use("/users" , authMiddleware , users);
router.use("/products" , authMiddleware , products);



export default router; 