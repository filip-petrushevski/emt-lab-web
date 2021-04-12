import axios from '../utils/axios';
import {
  BOOKS_LOADED,
  BOOKS_LOAD_FAILED,
  CATEGORIES_LOADED,
  CATEGORIES_LOAD_FAILED,
  BOOK_TAKEN,
  BOOK_TAKE_FAILED,
  BOOK_ADDED,
  BOOK_ADD_FAILED,
  BOOK_DELETED,
  BOOK_DELETE_FAILED,
  BOOK_EDITED,
  BOOK_EDIT_FAILED,
  BOOK_TO_BE_EDITED,
} from './types';

export const getBooks = ({ page, pageSize }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `/api/books?page=${page}&size=${pageSize}`,
      config,
    );
    dispatch({
      type: BOOKS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKS_LOAD_FAILED,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/books/categories');
    dispatch({
      type: CATEGORIES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_LOAD_FAILED,
    });
  }
};

export const markBookAsTakenById = (bookId) => async (dispatch) => {
  try {
    await axios.patch(`/api/books/${bookId}/decreaseCopies`);
    dispatch({
      type: BOOK_TAKEN,
      payload: bookId,
    });
  } catch (err) {
    dispatch({
      type: BOOK_TAKE_FAILED,
    });
  }
};

export const addBook = (
  name,
  bookCategory,
  authorId,
  availableCopies,
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    bookCategory,
    author: { id: authorId },
    availableCopies,
  });

  try {
    await axios.post(`/api/books`, body, config);
    dispatch({
      type: BOOK_ADDED,
    });
  } catch (err) {
    dispatch({
      type: BOOK_ADD_FAILED,
    });
  }
};

export const deleteBookById = (bookId) => async (dispatch) => {
  try {
    await axios.delete(`/api/books/${bookId}`);
    dispatch({
      type: BOOK_DELETED,
      payload: bookId,
    });
  } catch (err) {
    dispatch({
      type: BOOK_DELETE_FAILED,
    });
  }
};

export const bookToBeEdited = (bookToEdit) => (dispatch) => {
  dispatch({
    type: BOOK_TO_BE_EDITED,
    payload: bookToEdit,
  });
};

export const editBook = ({
  id,
  name,
  bookCategory,
  authorId,
  availableCopies,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const newBook = {
    id,
    name,
    bookCategory,
    author: { id: authorId },
    availableCopies,
  };
  const body = JSON.stringify(newBook);

  try {
    await axios.patch(`/api/books`, body, config);
    dispatch({
      type: BOOK_EDITED,
      payload: newBook,
    });
  } catch (err) {
    dispatch({
      type: BOOK_EDIT_FAILED,
    });
  }
};
