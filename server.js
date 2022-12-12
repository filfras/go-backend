const dotenv = require('dotenv').config() //config get all the variables from the env file
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('This is my server response!');
});
console.log(process.env.PORT, 'PORTnumber')
server.listen(process.env.PORT || 3000);
// || means or
//Ctrl+C to stop the execution

