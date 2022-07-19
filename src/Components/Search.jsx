import React, {useState, useEffect} from "react";
import { useCallback } from "react";

let timeout;
const Search =( { filterCards }) => {
  const [searchs, setSearchs] = useState();
  const handleSearchChange = useCallback((e) => {
    //example search
    //Jamel Cole

    let value = e.target.value.trim();
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
      filterCards(value)
    }, 500)
  }, [])
 

  return (

    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center'}}>
        <h6>Search Results</h6>
        <input
        type="search"
        placeholder="Search by Assignee or ASGRP..."
        style={{width:'20%'}}
        onChange={handleSearchChange}
      />
      <img className="icon" src={require('../Assets/search.png')} alt="Search icon" style={{width: '18px', marginLeft: 10 }}/>
        {

        }
        <br></br>
    </div>
  );
};

export default Search;