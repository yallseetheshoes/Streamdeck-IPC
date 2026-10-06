const net = require('net');

const PIPE_PATH = '\\\\.\\pipe\\examplePipe'; // Replace with your actual pipe name

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(`Received: ${data.toString()}`);
    });
});
server.listen(PIPE_PATH, () => {
    console.log(`Server listening on: ${PIPE_PATH}`);
});