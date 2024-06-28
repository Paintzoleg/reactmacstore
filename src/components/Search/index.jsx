import React from 'react'
import { useRef, useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
import style from './style.module.css'

import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const inputRef = useRef()

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 300),
    []
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={style.main}>
      <svg
        className={style.icon}
        enableBackground="new 0 0 32 32"
        height="32px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 32 32"
        width="32px"
      >
        <g>
          <path d="M13,2C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z M13,22c-4.962,0-9-4.037-9-9   c0-4.962,4.038-9,9-9c4.963,0,9,4.038,9,9C22,17.963,17.963,22,13,22z" />
          <path d="M29.707,28.293l-6.001-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.001,6C28.488,29.902,28.744,30,29,30   s0.512-0.098,0.707-0.293C30.098,29.316,30.098,28.684,29.707,28.293z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        placeholder="Search..."
      />

      {value && (
        <svg
          ref={inputRef}
          onClick={onClickClear}
          className={style.x}
          stroke="#000000"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line strokeWidth="4" x1="2" x2="30" y1="2" y2="30" />
          <line strokeWidth="4" x1="2" x2="30" y1="30" y2="2" />
        </svg>
      )}
    </div>
  )
}

export default Search
