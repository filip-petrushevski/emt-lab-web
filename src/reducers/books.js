import {
  BOOKS_LOADED,
  BOOKS_LOAD_FAILED,
  BOOK_ADDED,
  BOOK_ADD_FAILED,
  BOOK_TAKEN,
  BOOK_TAKE_FAILED,
  BOOK_DELETED,
  BOOK_DELETE_FAILED,
  BOOK_TO_BE_EDITED,
  BOOK_EDITED,
  BOOK_EDIT_FAILED,
} from '../actions/types';

const initialState = { bookData: [], totalElements: 0, bookToEdit: {} };

const booksReducer = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BOOKS_LOADED:
      return {
        ...state,
        bookData: payload.content,
        totalElements: payload.totalElements,
      };
    case BOOK_TAKEN:
      return {
        ...state,
        bookData: state.bookData.map((book) =>
          book.id === payload
            ? { ...book, availableCopies: book.availableCopies - 1 }
            : book,
        ),
      };
    case BOOK_DELETED:
      return {
        ...state,
        bookData: state.bookData.filter((book) => book.id !== payload),
      };
    case BOOK_TO_BE_EDITED:
      return {
        ...state,
        bookToBeEdited: payload,
      };
    case BOOK_EDITED:
    case BOOKS_LOAD_FAILED:
    case BOOK_TAKE_FAILED:
    case BOOK_ADDED:
    case BOOK_ADD_FAILED:
    case BOOK_DELETE_FAILED:
    case BOOK_EDIT_FAILED:
    default:
      return state;
  }
};

export default booksReducer;
