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
  const finished = (readPage === pageCount);
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  books.push(newBook);
  const validate = books.filter((book) => book.id === id).length > 0;
  if (validate) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filter = books;
  if (name) {
    filter = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: filter.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    if (reading === '1') {
      // eslint-disable-next-line eqeqeq
      filter = books.filter((book) => book.reading === (reading == 1));
      const response = h.response({
        status: 'success',
        data: {
          books: filter.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }

    if (reading === '0') {
      // eslint-disable-next-line eqeqeq
      filter = books.filter((book) => book.reading === (reading == 0));
      const response = h.response({
        status: 'success',
        data: {
          books: filter.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  }

  if (finished) {
    /*
    if (finished === '1') {
      // eslint-disable-next-line eqeqeq
      filter = books.filter((book) => book.finished === (finished === true)).map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
      const response = h.response({
        status: 'success',
        data: {
          books: filter,
        },
      });
      response.code(200);
      return response;
    }

    if (finished === '0') {
      const response = h.response({
        status: 'success',
        data: {
          books: books.filter((book) => book.finished === (finished === false)).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
    */

    if (finished === '1') {
      // eslint-disable-next-line eqeqeq
      filter = books.filter((book) => book.finished === (finished == 1));

      const response = h.response({
        status: 'success',
        data: {
          books: filter.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }

    if (finished === '0') {
      filter = books.filter((book) => book.finished === (finished === false)).map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

      const response = h.response({
        status: 'success',
        data: {
          books: filter,
        },
      });
      response.code(200);
      return response;
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filter.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};
/*
const getAllBooksHandler = (request, h) => {
  const { name } = request.query;
  if (!name) {
    const response = h.response({
      status: 'success',
      data: {
        book: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'fail to get all book',
  });
  response.code(500);
  return response;
};
*/
const getSpecifiedBookHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const finished = (readPage === pageCount);
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
export {
  addBooksHandler,
  getAllBooksHandler,
  getSpecifiedBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
