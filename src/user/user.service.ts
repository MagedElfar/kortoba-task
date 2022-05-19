import { User } from "./user.interface";
import {getUserByEmail , insertUser , getUserById} from "./user.model";

const addUser = async (data:User): Promise<number> | never => {
    try {
        const id:number = await insertUser(data);
        return id
    } catch (error) {
        throw error
    }
}

const checkIfUserExist = async (email:string): Promise<User>  => {
    try {
        const user:User = await getUserByEmail(email);
        return user
    } catch (error) {
        throw error
    }
}

const getUser = async (id:number) => {
    try {
        const user:User = await getUserById(id);
        const {password , ...others} = user
        return {
            type: "success",
            user: others
        }
    } catch (error) {
        throw error
    }
}


export {checkIfUserExist , addUser , getUser}