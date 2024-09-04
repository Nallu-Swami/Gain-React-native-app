const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
});
server.listen(4040, () => {
    console.log('Server is listening on port 4040');
});
