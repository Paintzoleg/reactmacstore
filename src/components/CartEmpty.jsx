import React from 'react'
import { Link } from 'react-router-dom'
import cartEmptyImg from '../assets/img/emptycart.png'

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>The Cart is Empty</h2>
        <p>
          You haven't ordered anything yet
          <br />
          To buy something, go to the main page.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Go to Back</span>
        </Link>
      </div>
    </>
  )
}

export default CartEmpty
