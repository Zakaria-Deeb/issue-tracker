import React from 'react'
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const SearchBar = (props) => {
  const [wordEntered, setWordEnetered] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const clearInput = () => {
    setWordEnetered("")
  }

  const handleSearchChange = (e) => {
    const searchWord = e.target.value
    setWordEnetered(searchWord)
    if (!e.target.value) return props.setSearchResults(props.issues)
    const ResultsArray = props.issues.filter(issues => issues.title.toLowerCase().includes(e.target.value))
    props.setSearchResults(ResultsArray)
  }

  return (
    <form onSubmit={handleSubmit} className='Search'>

      <div className='SearchInput'>
        <input type="text" value={wordEntered} placeholder='Search by Title' onChange={handleSearchChange} />
        </div>
        
        <div className='SearchIcon'>
          {wordEntered === "" ? <SearchIcon /> : <CloseIcon id="clrBtn" onClick={clearInput} />}
        </div>
    </form>
  )
}

export default SearchBar