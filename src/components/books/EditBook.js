import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/books';
import { initialUppercaseFollowedByLowercase } from '../../utils/utilFunctions';
import { editBook } from '../../actions/books';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';

const EditBook = ({ categories, getCategories, editBook, bookToEdit }) => {
  const history = useHistory();

  useEffect(() => {
    if (categories == null || categories.length === 0) {
      getCategories();
    }
  }, [categories, getCategories]);

  const [state, setState] = useState({
    id: bookToEdit?.id,
    author: bookToEdit?.author,
    category: bookToEdit?.bookCategory,
    availableCopies: bookToEdit?.availableCopies,
    name: bookToEdit?.name,
  });

  const handleCategoryChange = (e) => {
    setState({ ...state, category: e.target.value });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    await editBook({
      id: state.id,
      name: state.name,
      bookCategory: state.category,
      authorId: 1,
      availableCopies: parseInt(state.availableCopies),
    });
    history.push('/books');
  };

  return (
    <>
      <Typography variant="h6">Book ID: {bookToEdit?.id}</Typography>
      <Typography variant="h6">
        Author: {bookToEdit?.author.name + ' ' + bookToEdit?.author.surname}
      </Typography>
      <FormControl>
        <TextField
          required
          id="name"
          label="Name"
          onChange={onChange}
          defaultValue={state.name}
        />
        <FormControl>
          <InputLabel id="category-input">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={state.category}
            onChange={handleCategoryChange}
          >
            {categories.map((c) => (
              <MenuItem value={c} key={c.toLowerCase()}>
                {initialUppercaseFollowedByLowercase(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          id="availableCopies"
          label="# of copies available"
          type="number"
          onChange={onChange}
          defaultValue={state.availableCopies}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </>
  );
};

EditBook.propTypes = {
  categories: PropTypes.array.isRequired,
  getCategories: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  bookToEdit: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  bookToEdit: state.books.bookToBeEdited,
});

export default connect(mapStateToProps, { getCategories, editBook })(EditBook);
