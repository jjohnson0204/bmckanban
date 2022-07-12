import React, {useState, useEffect} from "react";
import axios from "axios";

const Search =() => {
  const [searchs, setSearchs] = useState();

  useEffect(() => {
    axios.get(`https://helixtrialsjc333-dev-restapi.onbmc.com/searchs`, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => {
        const responseSearchs = res.data;
        console.log(responseSearchs);
        setSearchs(responseSearchs);
    })
    console.log("The search ran");
  }, []);

  return (

    <div>
        <h6>Search Results</h6>
        <input
        type="search"
        placeholder="Search by Assignee or ASGRP..."
    
      />
      <img src={require('../Assets/search.png')} alt="Search icon" />
        {/* {searchs && searchs.map(searchs => {
            const {id,workorderId, assignee, asgrp,summary, status} = searchs;
            return (
                <div key={id}>
                <h5>{workorderId}</h5>
                <h5>{assignee}</h5>
                <h5>{asgrp}</h5>
                <h5>{summary}</h5>
                <h5>{status}</h5>
                </div>
            )
        })} */}
    </div>
  );
};

export default Search;