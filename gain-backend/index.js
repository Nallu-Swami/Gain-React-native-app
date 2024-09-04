import express from 'express';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import ollama from 'ollama'
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

Server.post('/upload', async (req, res) => {
    try {
        const { uuid } = req.body;
        console.log('Request body:', req.body);

        // Query Supabase
        const { data, error } = await supabase
            .from('parsed-user-data')
            .select('whole_parsed_data')
            .eq('uuid', uuid)
            .single();

        if (error) {
            console.error('Error querying Supabase:', error);
            return res.status(500).send({ error: 'Failed to query Supabase' });
        }

        console.log('Supabase result:', data);

        if (data) {

            const messageContent = `${data.whole_parsed_data} => Analyze the following text and extract the required details: user_name: The full name of the person, user_occupation: The person’s current job or occupation, user_source_of_income: The main source of the person’s income, user_expenses: A list of the person’s regular expenses, user_savings: The amount of money the person has saved, user_family_size: The number of family members, if mentioned, user_aim: The person’s primary goal or aspiration, user_capital_required_for_aim: Estimate the amount of money needed to achieve the aim based on the person's goal, user_time_required_to_obtain_aiminlife: The estimated time needed to achieve the aim (based on the user aim calculate the data required), user_risk_level: Any risks the person is currently facing; if explicitly mentioned, classify the risk as "low" or "high." If any of the above details are not explicitly mentioned or are unclear, do not make assumptions and mark those fields as "NULL." Output the extracted information in the following format: {"user_name": "full name", "user_source_of_income": "income source", "user_aim": "main goal", "whole_parsed_data": "parsed data", "user_occupation": "current job", "user_expenses": "list of expenses", "user_savings": "amount saved", "user_family_size": "number of family members", "user_capital_required_for_aim": "amount needed", "user_time_required_to_obtain_aiminlife": "time needed", "user_risk_level": "risk level"}`;
            const response = await ollama.chat({
                model: 'llama3',
                messages: [{ role: 'user', content: messageContent }],
            });

            console.log('Ollama response:', response.message.content);

            res.status(200).send({ message: 'UUID found', whole_parsed_data: data.whole_parsed_data });
        } else {
            res.status(404).send({ message: 'UUID not found' });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});
