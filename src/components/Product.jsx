import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

import { addItem, selectCartItemById } from '../redux/slices/cartSlice'

const typeNames = ['silver', 'black']


const Product = ({ id, title, price, image, sizes, types, rating }) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      image,
      type: typeNames[activeType],
      sizes[activeSize],
    }
    dispatch(addItem(item))
    
  }


  return (
    <div className="product-wrapper">
      <div className="product">
        <Link to={`/product/${id}`}>
          <h4 className="product__title">{title}</h4>
          <img className="product__image" src={image} alt="Apple Mac Product" />
        </Link>
        <div className="product__selector">
          <ul>
            {types.map((typeId) => (
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
            {sizes.map((size, i) => (
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
          <div className="product__price">from ${price}</div>
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
      </div>
    </div>
  )
}

export default Product
