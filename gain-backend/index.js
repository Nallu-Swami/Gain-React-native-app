import express from 'express';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';  // Corrected import for cors

// Initial Configuration
config();

// Connection code for Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error("Invalid Environment Process key");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const Server = express();
const open_port = process.env.PORT || 4040;

// Adding middlewares
Server.use(express.json());


// Main Server Side Functions
Server.listen(open_port, () => {
    console.log(`Server is listening on port ${open_port}`);
});

// GET request handler for '/testing'
Server.get('/testing', (req, res) => {
    res.send('Got the GET request!');
    console.log("Received a Request");
});

// GET request handler for '/whole'
Server.get('/whole', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('parsed-user-data')
            .select('uuid, whole_parsed_data');
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(data);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});
Server.use(cors({ origin: true, credentials: true }));
// POST request handler for '/upload'
Server.post('/upload', async (req, res) => {
    try {
        const { uuid } = req.body;
        console.log(req.body);
        res.status(200).send({ message: 'UUID received', uuid });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
});
