import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user:process.env.RDS_USER,
    password:process.env.RDS_PASSWORD,
    host:process.env.RDS_HOST,
    port:process.env.RDS_PORT,
    database:process.env.RDS_DATABASE


});



export default pool;