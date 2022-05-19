import { formatDbError } from "../utils/error-format";
import db from "./../database"
import { User } from "./user.interface";

const insertUser = async (data:User):Promise<number> | never => {
    try {
        const id = await db("users").insert(data);
        return id[0]; 
    } catch (error) {
        console.log(error);
        throw formatDbError(error);
    }
}

// const getUserById = async (id) => {
//     try {
//         const user =  await db("users")
//         .leftJoin(...userModelJoin)
//         .select(...userModelSelect)
//         .where({"users.id" : id}).first();
//         const {password , ...others} = user;
//         filleterNullProperties(others)
//         return others;
//     } catch (error) { 
//         console.log(error);
//         throw formatDbError(error);
//     }
// }

const getUserByEmail = async (email:string): Promise<User> | never => {
    try {
        let user = await db("users").where({email}).first();
        return user;
    } catch (error) {
        console.log(error);
        throw formatDbError(error);
    }
}

// const updateUser = async (id , data) => {
//     try {
//         await db("users").update(data).where({ id });
//     } catch (err) {
//         throw formatDbError(err);
//     }
// }

// const deleteUser = async (id) => {
//     try {
//         await db("users").delete().where({ id });
//     } catch (error) {
//         throw formatDbError(error);
//     }
// }

export {insertUser , getUserByEmail}