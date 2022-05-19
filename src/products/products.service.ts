import Product from "./products.interface";
import {insert , getProducts , getProductById , update , deleteProduct as deletePro} from "./products.model";

const getAllProducts = async () => {
    try {
        const products = await getProducts();
        return  {
            type: "success",
            products
        };
    } catch (error) {
        throw error
    }
}

const getProduct = async (id:number) => {
    try {
        const product = await getProductById(id);
        if(!product) throw({status: 404 , message: `product not found`});
        
        return  {
            type: "success",
            product
        };
    } catch (error) {
        throw error
    }
}

const addProduct = async (user:any , data: any , file:any): Promise<any>  => {
    try {
        const product = {
            user,
            ...data,
            image: file?.filename || ""
        }
        const id:number = await insert(product);
        return {
            type: "success",
            product: {
                id,
                ...product
            }
        }
    } catch (error) {
        throw error
    }
}

const updateProduct = async (user:number , id:number , data: any , file:any): Promise<any>  => {
    try {
        let product = await getProductById(id);

        if(!product) throw({status: 404 , message: `product not found`});
        if(product.user !== user) throw({status: 403 , message: `ACCESS DENIED`});
        
        if(file?.filename) product.image = file?.filename;

        product = {...product , ...data};

        const {username , ...others} = product

        await update(id , others);

        return {
            type: "success",
            product
        }
    } catch (error) {
        throw error
    }
}

const deleteProduct = async (user:number , id:number): Promise<any>  => {
    try {
        let product = await getProductById(id);

        if(!product) throw({status: 404 , message: `product not found`});

        if(product.user !== user) throw({status: 403 , message: `ACCESS DENIED`});

        await deletePro(id);

        return {
            type: "success",
        }
    } catch (error) {
        throw error
    }
}

export {addProduct , getAllProducts , getProduct , updateProduct , deleteProduct}