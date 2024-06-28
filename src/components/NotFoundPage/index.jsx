import React from 'react'
import style from './style.module.css'
import nothingimage from '../../assets/img/nothingimage.png'

const NotFoundPage = () => {
  return (
    <div className={style}>
      <h1>This Page was Not Found</h1>
      <img className={style.pic} width="360" src={nothingimage} alt="logo" />
    </div>
  )
}

export default NotFoundPage
