const dotenv = require('dotenv').config() //config get all the variables from the env file
const http = require('http');
const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
    return val;
    }
    if (port >= 0) {
    return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
    throw error;
    }
};

//app.set('port', process.env.PORT || 3000); 
//to know in which port we are on
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);

//server.listen(process.env.PORT || 3000);
//node creates the server using our express app











//hard server:
/*const server = http.createServer((req, res) => {
    res.end('This is my server response!');
});
console.log(process.env.PORT, 'PORTnumber')
server.listen(process.env.PORT || 3000);*/

// || means or
//Ctrl+C to stop the execution