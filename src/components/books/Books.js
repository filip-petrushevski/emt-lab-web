import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBooks,
  markBookAsTakenById,
  deleteBookById,
  bookToBeEdited,
} from '../../actions/books';
import Button from '@material-ui/core/Button';
import { initialUppercaseFollowedByLowercase } from '../../utils/utilFunctions';
import { useHistory } from 'react-router';

const Books = ({
  bookData,
  totalElements,
  getBooks,
  markBookAsTakenById,
  deleteBookById,
  bookToBeEdited,
}) => {
  const PAGE_SIZE = 5;
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    getBooks({ page, pageSize: PAGE_SIZE });
  }, [page, getBooks]);

  const onPageChange = (params) => {
    setPage(params.page);
  };

  const history = useHistory();

  const columns = [
    { field: 'id', hide: true, flex: 1 },
    { field: 'name', flex: 1.3 },
    {
      field: 'bookCategory',
      headerName: 'category',
      flex: 1,
      valueFormatter: (params) =>
        initialUppercaseFollowedByLowercase(params.value),
    },
    {
      field: 'author',
      flex: 1,
      valueFormatter: (params) =>
        params.value && params.value.name + ' ' + params.value.surname,
    },
    { field: 'availableCopies', headerName: '# of copies', flex: 0.5 },
    {
      field: 'actions',
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="primary"
              onClick={() => markBookAsTakenById(params.row.id)}
              disabled={params.row.availableCopies <= 0}
            >
              Mark taken
            </Button>
            <Button
              color="primary"
              onClick={() => {
                bookToBeEdited(params.row);
                history.push('/edit-book');
              }}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              onClick={() => deleteBookById(params.row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        page={page}
        onPageChange={onPageChange}
        pageSize={PAGE_SIZE}
        rowCount={totalElements}
        columns={columns}
        rows={bookData}
        pagination
        paginationMode={'server'}
      />
    </div>
  );
};

Books.propTypes = {
  bookData: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  getBooks: PropTypes.func.isRequired,
  markBookAsTakenById: PropTypes.func.isRequired,
  deleteBookById: PropTypes.func.isRequired,
  bookToBeEdited: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  bookData: state.books.bookData,
  totalElements: state.books.totalElements,
});

export default connect(mapStateToProps, {
  getBooks,
  markBookAsTakenById,
  deleteBookById,
  bookToBeEdited,
})(Books);
