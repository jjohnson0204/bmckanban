const fs = require("fs")
const fetch = require("node-fetch");
const path = require("path");
const host = "https://helixtrialsjc333-dev-restapi.onbmc.com";
const url = host + "/api"; 
require('dotenv').config({ debug: true })



const getToken = async () => {
    const uri = `${url}/jwt/login`;
    const headers = {
        "Accept": "text/plain",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        'Access-Control-Allow-Origin': "*" 
    }
    //TODO: Abstract username and password into .env file
    
    //NOTE: create .env file in root folder with your BMC_USERNAME & BMC_PASSWORD
    const password = process.env.BMC_PASSWORD
    const username = process.env.BMC_USERNAME
    const body = { username, password }
    var formBody = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(uri, {
        method: "POST",
        headers,
        body: formBody,
        mode: "no-cors",
        credentials: 'include'
    }).then((value)=>{
        return value.text()
    })
}


const saveToken = async () => {
    let token = await getToken();
    let json = JSON.stringify({token});
    fs.writeFileSync(path.join(__dirname, "../Data/token.json"), json)
    console.log("Token saved to token.json")
}
module.exports = {
    getToken, saveToken
}