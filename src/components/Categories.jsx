import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Categories = ({ value, onChangeCategory }) => {

  const [activeIndex, setActiveIndex] = useState(0)

  const categories = [
    'All',
    'iMac',
    'Mac Pro',
    'MacBook Pro',
    'MacBook Air',
    'Mac Mini',
  ]


  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={uuidv4()}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
