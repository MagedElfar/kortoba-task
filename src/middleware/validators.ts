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

// //user validation
// exports.userValidation = [
//     expressValidator.check("email").not().isEmpty().isEmail().withMessage("Invalid Email Provided"),
    
//     expressValidator.check('purchase_date').optional().toDate().isISO8601().withMessage("Invalid Purchase Date Format Provided"),

//     expressValidator.check('address').optional().matches( /^[A-Za-z0-9 ]+$/).withMessage("Address Must not contain special characters"),

//     expressValidator.check('insurance_id').optional().isLength({min: 3}).withMessage("Invalid Insurance ID Provided")
// ]

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

export {isValidate , signupValidation , loginValidation}