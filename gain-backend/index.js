import express from 'express';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import ollama from 'ollama';

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

// Declare a global variable to store the UUID
let globalUUID = '';

// Adding middlewares
Server.use(express.json());
Server.use(cors({ origin: true, credentials: true }));

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

// POST request handler for '/upload'
Server.post('/upload', async (req, res) => {
    try {
        const { uuid } = req.body;
        console.log('Request body:', req.body);

        // Store the uuid in the global variable
        globalUUID = uuid;

        // Query Supabase to get the whole_parsed_data based on uuid
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
            const messageContent = `${data.whole_parsed_data} => Analyze the following text and extract the required details. For fields requiring estimation, use information from user_aim and other details to make informed estimates. If vague or missing, provide do not provide direct assumptions . Use these fields: user_name (full name), user_occupation (current job), user_source_of_income (income source), user_expenses (list of expenses), user_savings (amount saved), user_family_size (number of family members), user_aim (main goal), user_capital_required_for_aim (specific amount needed based on industry estimates), user_time_required_to_obtain_aiminlife (time needed based on resources and savings), user_risk_level (classified as "low" or "high" if mentioned). If any details are unclear or missing, assume "NULL" only if no data is available. Output in the format: {"user_name": "full name", "user_source_of_income": "income source", "user_aim": "main goal", "whole_parsed_data": "parsed data", "user_occupation": "current job", "user_expenses": "list of expenses", "user_savings": "amount saved", "user_family_size": "number of family members", "user_capital_required_for_aim": "amount needed", "user_time_required_to_obtain_aiminlife": "time needed", "user_risk_level": "risk level"}.`;

            const response = await ollama.chat({
                model: 'llama3',
                messages: [{ role: 'user', content: messageContent }],
            });

            console.log('Ollama response:', response.message.content);

            // Extract and clean JSON string
            let jsonString = response.message.content.match(/\{.*\}/s)[0];
            jsonString = jsonString.replace(/NULL/g, 'null')
                .replace(/\([^)]+\)/g, '')
                .replace(/,\s*}/g, '}');

            console.log('Cleaned JSON string:', jsonString);

            try {
                let filter_data = JSON.parse(jsonString);
                console.log(filter_data);

                const { data: supabaseInsertData, error: supabaseInsertError } = await supabase
                    .from('parsed-user-data')
                    .update({
                        user_name: filter_data.user_name,
                        user_source_of_income: filter_data.user_source_of_income,
                        user_aim: filter_data.user_aim,
                        user_occupation: filter_data.user_occupation,
                        user_expenses: filter_data.user_expenses,
                        user_savings: filter_data.user_savings,
                        user_family_size: filter_data.user_family_size,
                        user_capital_required_for_aim: filter_data.user_capital_required_for_aim,
                        user_time_required_to_obtain_aiminlife: filter_data.user_time_required_to_obtain_aiminlife,
                        user_risk_level: filter_data.user_risk_level,
                        whole_parsed_data: JSON.stringify(filter_data),
                    })
                    .eq('uuid', uuid);

                if (supabaseInsertError) {
                    console.error('Error inserting/updating Supabase:', supabaseInsertError);
                    return res.status(500).send({ error: 'Failed to insert or update parsed data in Supabase' });
                }

                res.status(200).send({ message: 'UUID found and data updated successfully', whole_parsed_data: filter_data });

            } catch (error) {
                console.error("Error parsing JSON or inserting to Supabase:", error);
                res.status(500).send({ error: 'Error parsing or storing the data' });
            }

        } else {
            res.status(404).send({ message: 'UUID not found' });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});


Server.get('/get-global-uuid', (req, res) => {
    res.send({ globalUUID });
    console.log(`Global UUID: ${globalUUID}`);
});
