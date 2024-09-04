import express from 'express';
import {config} from 'dotenv';
import supabase from '/Users/aringy/Desktop/MATH/gain-backend/Database/database.js'
//Initial Configuration
config();


const Server = express();
const open_port = process.env.PORT;
Server.listen(open_port,()=>{
    console.log(`Server is listening on port ${open_port}`);
});

//Test function to check database
// async function fetchData() {
//     const { data, error } = await supabase
//         .from('your_table')
//         .select('*');

//     if (error) {
//         console.error('Error fetching data:', error);
//     } else {
//         console.log('Data:', data);
//     }
// }
