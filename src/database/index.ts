import dbConfiguration from "./knexfile";
import {knex} from "knex";

const db = knex(dbConfiguration)

db.raw("SELECT VERSION()").then(() => {
  console.log("database is connected successfully");
}).catch(err => console.error('error connecting: ', err));

export default db;