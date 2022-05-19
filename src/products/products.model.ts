import { formatDbError } from "../utils/error-format";
import db from "../database"
import Product from "./products.interface";

const insert = async (data:Product):Promise<number> | never => {
    try {
        const id = await db("products").insert(data);
        return id[0];
    } catch (error) {
        console.log(error);
        throw formatDbError(error);
    }
}

const getProducts = async ():Promise<Array<Product>> | never => {
    try {
        const products = await db("products as p")
        .leftJoin("users as u" , "u.id" , "=" , "p.user" )
        .select("p.*" ,"u.username as username")
        return products;
    } catch (error) {
        console.log(error);
        throw formatDbError(error);
    }
}

const getProductById = async (id:number):Promise<Product> | never => {
    try {
        const product = await db("products as p")
        .leftJoin("users as u" , "u.id" , "=" , "p.user" )
        .select("p.*" ,"u.username as username")
        .where({"p.id" : id}).first()
        return product;
    } catch (error) {
        console.log(error);
        throw formatDbError(error);
    }
}

const update = async (id:number , data:any): Promise<void> | never => {
    try {
        await db("products").update(data).where({ id });
        return;
    } catch (err) {
        throw formatDbError(err);
    }
}

const deleteProduct = async (id:number): Promise<void> => {
    try {
        await db("products").delete().where({ id });
        return;
    } catch (error) {
        throw formatDbError(error);
    }
}

export {insert , getProducts , getProductById , update , deleteProduct}