import React from 'react';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Books from './components/books/Books';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import Categories from './components/books/Categories';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path={['/books', '/']} component={Books}></Route>
          <Route exact path="/add-book" component={AddBook}></Route>
          <Route exact path="/edit-book" component={EditBook}></Route>
          <Route exact path="/categories" component={Categories}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
