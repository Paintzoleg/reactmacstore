import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import Lorem from './Lorem'
import { addItem, selectCartItemById } from '../redux/slices/cartSlice'

const FullProduct = ({ title, price, image, count, sizes, types, rating }) => {
  const [product, setProduct] = useState()
  const typeNames = ['silver', 'black']

  const { id } = useParams()


  const navigate = useNavigate()

  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const addedCount = cartItem ? cartItem.count : 0


  const onClickBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          'https://6645b3cdb8925626f892c714.mockapi.io/items/' + id
        )
        setProduct(data)
      } catch (error) {
        alert('Request not found, go to home...')
        navigate('/')
      }
    }

    fetchProduct()
  }, [id, navigate, price])

  if (!product) {
    return 'Loading...'
  }

  const onClickAdd = () => {
    const item = {
      id: product.id,
      title: product.title,
      price : product.price,
      image : product.image,
      type: typeNames[activeType],
      size: activeSize,
    }

    dispatch(addItem(item))

  }
  //==========================================

  return (
    <div className="container">
      <h1>{product.title}</h1>
      <img src={product.image} alt="apple product" />
      <div className="cart cart--empty">
        <div>
          <h2>{product.title}</h2>
          <Lorem />

          <div className="product__selector">
            <ul>
              {product.types?.map((typeId) => (
                <li
                  key={uuidv4()}
                  onClick={() => {
                    setActiveType(typeId)
                  }}
                  className={activeType === typeId ? 'active' : ''}
                >
                  {typeNames[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {product.sizes?.map((size, i) => (
                <li
                  key={uuidv4()}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? 'active' : ''}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className="product__bottom">
            <div className="product__price">from ${product.price}</div>
            <button
              onClick={onClickAdd}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Add</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>

          <div onClick={onClickBack} className="button button--black">
            <span>Go to Back</span>
          </div>
        </div>
        <div className="product__bottom"></div>
      </div>
    </div>
  )
}

export default FullProduct
