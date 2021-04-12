import { combineReducers } from 'redux';
import auth from './auth';
import books from './books';
import categories from './categories';
export default combineReducers({
    auth,
    books,
    categories
});
