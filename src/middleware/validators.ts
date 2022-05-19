import  {check , validationResult} from "express-validator";
import {Request , Response , NextFunction} from "express"

//auth validation
const signupValidation = [
    check("username").toLowerCase().not().isEmpty().withMessage("username is required"),

    check("email").isEmail().withMessage("Invalid Email Provided"),
    
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{8,}$/).withMessage('Invalid Password Format Provided ( Must be at least 8 characters, 1 number and at least one uppercase character )')
]

const loginValidation = [
    check("email").not().isEmpty().withMessage("Email is required"),
    
    check('password').not().isEmpty().withMessage("password is required"),
]

const productValidation = [
    check("title").toLowerCase().not().isEmpty().withMessage("title is required"),

    check("price").toFloat().not().isEmpty().withMessage("price is required"),
]

//check validation
const isValidate = (req:Request , res:Response , next:NextFunction) => {
    try {
        if(validationResult(req).isEmpty()) {
            next()
        } else {
            const errors = validationResult(req).array().reduce((obj:any , item:any) => {
                if(!obj[item.param]){
                    obj[item.param] = [item.msg]
                    return obj
                }

                obj[item.param].push(item.msg);
                return obj
            } , {});
            throw ({
                status:400,
                message: "Please Correct the following errors before proceeding",
                errors});
        }
    } catch (error) {
        return next(error)
    }
}

export {isValidate , signupValidation , loginValidation , productValidation}