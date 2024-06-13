import React, { useState } from 'react'
import searchIcon from ".././assets/search-icon.svg";

const Search = () => {

    const [searchText, setSearchText]= useState("");
    let handleInput = (e)=>{
        e.preventDefault();
        let query = e.target.value;
        setSearchText(query)
    }

  return (
   <>
   <form className='w-90 relative flex items-center ml-8 font-nunito'>
    <input
    onChange={handleInput}
    value={searchText}
    className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan'
    placeholder='search here...'
    
    type="text" name="search"/>
    <button 
    className='absolute right-1 cursor-pointer'
    type="submit">
        <img src={searchIcon}
        className='w-full h-auto'
        alt="search"></img>
    </button>
   </form>

    {
        searchText.length > 0 ? 
        <ul className='absolute top-11 right-0 w-full h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md'>
            <li>bitcoin</li>
            <li>ethereum</li>
        </ul>
        : null
    }

   </>
  )
}

export default Search
