import bcrypt from "bcrypt"
import {accessToken} from "./../utils/helpers"
import { User } from "../user/user.interface";
import { addUser, checkIfUserExist } from "../user/user.service";

require("dotenv").config();

//login
const login = async (data:User) => {
    try {

        const {email , password} = data;

        const user = await checkIfUserExist(email)

        if(!user)  {
            throw({status: 400 , message: `Invalid Email or Password`});
        }

        const matched =  await bcrypt.compare(password , user.password);
        
        if(!matched)  {
            throw({status: 400 , message: `Invalid Email or Password`});
        }

        const id:number = user.id!;
        const token = accessToken( id , "15m");

        const {password: pass , ...others} = user


        return {
            type: "success",
            user: others,
            token
        }
    } catch (error) {
        throw error
    }
}

//signup
const signup = async (data:User) => {
    try {
        const {password , email , username} = data;

        const user = await checkIfUserExist(email)

        if(user) throw {
            status: 400,
            message: "Email already exists"
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const id = await addUser({
            password:hashedPassword,
            email,
            username
        });

        const token = accessToken(id , "15m");

        return {
            type: "success",
            user:{
                id,
                email,
                password
            },
            token
        }
    } catch (error) {
        throw error
    }
}

export {signup , login}