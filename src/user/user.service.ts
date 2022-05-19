import { User } from "./user.interface";
import {getUserByEmail , insertUser} from "./user.model";

const addUser = async (data:User): Promise<number> | never => {
    try {
        const id:number = await insertUser(data);
        return id
    } catch (error) {
        throw error
    }
}

const checkIfUserExist = async (email:string): Promise<User> | never  => {
    try {
        const user:User = await getUserByEmail(email);
        return user
    } catch (error) {
        throw error
    }
}

export {checkIfUserExist , addUser}