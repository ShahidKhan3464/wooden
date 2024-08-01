import React, { useState } from 'react'
import { Pagination } from '@material-ui/lab';
import { PaginationContainer } from './style';
const CustomPagination = ({ rowsPerPage, count, onChangePage, rowsPerPageOptions, onChangeRowsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    let visit = currentPage * (parseInt(rowsPerPage) * 1)
    let from = visit - parseInt(rowsPerPage) + 1
    let to = visit
    let pages = Math.ceil(count / parseInt(rowsPerPage));
    if (to > count) { to = count }
    const handlePageChange = (e, value) => {
        setCurrentPage(value)
        onChangePage(e, value)
    }
    return (
        <PaginationContainer>
            <div className='paginationLeftContent'>
                <p>
                    Show
                    <select
                        value={parseInt(rowsPerPage)}
                        onChange={onChangeRowsPerPage}
                    >
                        {rowsPerPageOptions.map((pageSize, index) => (
                            <option value={pageSize} key={index}>{pageSize}</option>
                        ))}
                    </select>
                    entries
                </p>
            </div>
            <div className='paginationRightContent'>
                <p>
                    Showing {from} to {to} of {count} entries
                </p>
                <Pagination count={pages} page={currentPage} onChange={handlePageChange} />
            </div>
        </PaginationContainer >
    );
}
export default CustomPagination