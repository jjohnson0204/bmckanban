const fs = require("fs")
const fetch = require("node-fetch");
const path = require("path");
const host = "https://helixtrialsjc333-dev-restapi.onbmc.com";
const url = host + "/api"; 

const getCompanies =(token) => {
    const formName = "COM:Company";
    const uri = `${url}/arsys/v1/entry/${formName}`;

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
        .then((companies) =>{
            return companies.json()
        })
        // console.log(companies)
        // return companies
        

  
}

module.exports = {
    getCompanies
}