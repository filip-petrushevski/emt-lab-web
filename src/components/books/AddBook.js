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
import { addBook } from '../../actions/books';
import { useHistory } from 'react-router';

const AddBook = ({ categories, getCategories, addBook }) => {
  const [state, setState] = useState({
    category: 'THRILLER',
    availableCopies: '0',
    name: '',
  });

  const history = useHistory();

  useEffect(() => {
    if (categories == null || categories.length === 0) {
      getCategories();
    }
  }, [categories, getCategories]);

  const handleCategoryChange = (e) => {
    setState({ ...state, category: e.target.value });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    addBook(state.name, state.category, 1, parseInt(state.availableCopies));
    history.push('/books');
  };

  return (
    <>
      <FormControl>
        <TextField required id="name" label="Name" onChange={onChange} />
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
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </>
  );
};

AddBook.propTypes = {
  categories: PropTypes.array.isRequired,
  getCategories: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { getCategories, addBook })(AddBook);
