import Hapi from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
  });
  server.route(routes);
  await server.start();
  console.log(`server running at ${server.info.uri}`);
};

init();