const express = require('express'),
     http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;
const adminRouter = require('./routes/adminRouter');
const managerRouter = require('./routes/managerRouter');
const receptionistRouter = require('./routes/receptionistRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//app.use(express.static(__dirname + '/public'));

app.use('/admin', adminRouter);

app.use('/manager', managerRouter);

app.use('/receptionist', receptionistRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});