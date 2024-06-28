import React from 'react'
import ReactPaginate from 'react-paginate'
import pagstyle from './pagstyle.module.css'

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={pagstyle.all}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
