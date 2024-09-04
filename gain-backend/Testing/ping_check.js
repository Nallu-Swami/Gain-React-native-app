import { createServer } from 'http';

const server = createServer((req, res) => {
    const { method, url } = req;

    // Set response headers
    res.setHeader('Content-Type', 'application/json');

    // Handle different HTTP methods
    switch (method) {
        case 'GET':
            handleGet(req, res);
            break;
        case 'POST':
            handlePost(req, res);
            break;
        case 'PUT':
            handlePut(req, res);
            break;
        case 'PATCH':
            handlePatch(req, res);
            break;
        case 'DELETE':
            handleDelete(req, res);
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed\n');
    }
});

// Function to handle GET requests
function handleGet(req, res) {
    res.writeHead(200);
    console.log("Recieved a GET Reuqest");
    res.end(JSON.stringify({ message: 'GET request received\n' }));
}

// Function to handle POST requests
function handlePost(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
        // Process POST data
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'POST request received\n', data: JSON.parse(body) }));
    });
}

// Function to handle PUT requests
function handlePut(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
        // Process PUT data
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'PUT request received\n', data: JSON.parse(body) }));
    });
}

// Function to handle PATCH requests
function handlePatch(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
        // Process PATCH data
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'PATCH request received\n', data: JSON.parse(body) }));
    });
}

// Function to handle DELETE requests
function handleDelete(req, res) {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'DELETE request received\n' }));
}

// Start the server
server.listen(4040, () => {
    console.log('Server is listening on port 4040');
});
