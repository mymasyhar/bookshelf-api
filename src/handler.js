import { nanoid } from 'nanoid';
import books from './books.js';

// eslint-disable-next-line no-unused-vars
const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = false;
  const id = nanoid(8);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    id,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  const response = h.response({
    status: 'success',
    message: 'book added',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;

  //   const bookNameValidate = books.filter((book) => book.name !== '');

  //   if (bookNameValidate) {
  //     const response = h.response({
  //       status: 'fail',
  //       message: 'Gagal menambahkan buku. Mohon isi nama buku',
  //     });
  //     response.code(400);
  //     return response;
  //   }
  //   const response = h.response({
  //     status: 'success',
  //     message: 'book added',
  //     data: {
  //       bookId: id,
  //     },
  //   });
  //   response.code(201);
  //   return response;

  /*
  if (bookNameValidate) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  */

  /*
  if (bookPageValidate) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  */
};
// eslint-disable-next-line no-unused-vars
// const getAllBooksHandler = () => {};

// eslint-disable-next-line import/prefer-default-export
export { addBooksHandler };
