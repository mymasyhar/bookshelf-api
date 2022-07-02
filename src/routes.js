import { addBooksHandler } from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
];

export default routes;
