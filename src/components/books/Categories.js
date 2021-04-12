import React, { useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/books';
import { initialUppercaseFollowedByLowercase } from '../../utils/utilFunctions';

const Categories = ({ categories, getCategories }) => {
  useEffect(() => {
    if (categories == null || categories.length === 0) {
      getCategories();
    }
  }, [categories, getCategories]);

  const renderCategory = (props) => {
    return (
      <ListItem key={props.index}>
        <ListItemText
          primary={initialUppercaseFollowedByLowercase(categories[props.index])}
        />
      </ListItem>
    );
  };

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemSize={46}
      itemCount={categories?.length}
    >
      {renderCategory}
    </FixedSizeList>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { getCategories })(Categories);
