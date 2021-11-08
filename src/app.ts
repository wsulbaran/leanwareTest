import * as debug from 'debug';
import * as http from 'http';

require('dotenv-json-complex')();
import Server from './server';

const port = normalizePort(process.env.PORT || 3001);

Server.set('port', port);
console.log('Server running @ http://localhost:'+port+'/');
const server = http.createServer(Server);

server.listen(port, () => { 
  console.log('app is ready'); 
});
server.on('error', onError);
server.on('listening', onListening);

debug('ts-express:server');

function normalizePort(val: number|string): number|string|boolean {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (isNaN(port)) { return val; } else if (port >= 0) { return port; } else { return false; }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }

  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {

  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

  debug(`Listening on ${bind}`);
}
