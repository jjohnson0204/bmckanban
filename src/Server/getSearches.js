const fs = require("fs")
const fetch = require("node-fetch");
const path = require("path");
const host = "https://helixtrialsjc333-dev-restapi.onbmc.com";
const url = host + "/api"; 

const getSearches = (token) => {
    const formName = "WOI:WorkOrder"
            const uri = `${url}/arsys/v1/search`;
            
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'AR-JWT ' + token 
            };

            return fetch(uri, {
                headers,
                method: "GET",
                mode: "no-cors",
                // credentials: 'include'
            })
            .then((search) =>{
                return search.json()
            })
            // console.log(entries)
            // return entries
}


module.exports = {
    getSearches
}