import React, { useEffect, useContext, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Product from '../components/Product'

import Sort, { arrList } from '../components/Sort'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/Pagination'

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { v4 as uuidv4 } from 'uuid'
import { fetchProducts, selectProductData } from '../redux/slices/productSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { items, status } = useSelector(selectProductData)

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getProducts = async () => {

    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''


    dispatch(
      fetchProducts({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    )
  }

  //============================================================

  useEffect(() => {
    if (!isSearch.current) {
      getProducts()
    }
    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  //============================================================

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage, navigate])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = arrList.find(
        (obj) => obj.sortProperty === params.sortProperty
      )

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [dispatch])

  const productItem = items.map((obj) => <Product key={uuidv4()} {...obj} />)//to product page
  const skeletons = [...new Array(6)].map(() => <Skeleton key={uuidv4()} />)

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All Products</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error has occurred!</h2>
          <p>Failed to retrieve product list! Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : productItem}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home
