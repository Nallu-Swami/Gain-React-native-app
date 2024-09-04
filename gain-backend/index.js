import express from 'express';
import { config } from 'dotenv';
//Initial Configuration
config();


const Server = express();
const open_port = process.env.PORT;
Server.listen(open_port,()=>{
    console.log(`Server is listening on port ${open_port}`);
});

