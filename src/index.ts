import path from 'path';
import express , {Application , Response , Request , urlencoded , json, NextFunction} from 'express';
import cors from "cors";
import {config} from "dotenv";
import morgan from "morgan";
import routes from "./routes"
import { requestErrorFormat } from './utils/error-format';
config()

//server variables
const port:number = parseInt(process.env.PORT!) || 5000;

//server configuration
const app:Application = express();

app.use(cors())
app.use(morgan("short"));

app.use("/media", express.static(path.join(__dirname , ".." , "public" , "media")));

app.use(urlencoded({extended: true}) , json());

//api routes 
app.get("/" , (req:Request , res:Response) => {
    res.send("app server")
})
app.use("/api" , routes);

//error handling
app.use((err:any , req:Request , res:Response , next:NextFunction) =>{
    const error = requestErrorFormat(err)
    res.status(err.status || err.response?.data.code || 500).json(error)
}) 

//start server
app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})
