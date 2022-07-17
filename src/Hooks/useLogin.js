import axios from "axios";
import { useEffect, useState } from "react";
import { host, url } from "./config";


// export const useLogin = () => {
//     //set username and password in Env file before commiting
//     // const username = process.env.USERNAME;
//     // const password = process.env.PASSWORD;
//     const password = "RemedyPa$$w0rd"
//     const username = "jjohnson"
//     var formBody = [];
//     const uri = `${url}/jwt/login`;

//     const body = { username, password }
//     for (var property in body) {
//         var encodedKey = encodeURIComponent(property);
//         var encodedValue = encodeURIComponent(body[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");
//     const headers = {
//         "Accept": "text/plain",
//         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//         'Access-Control-Allow-Origin': "*" 
//     }

//     const [tokenIsSet, setTokenIsSet] = useState(null);
    
//     const [loginInitialized, setLoginInitialized] = useState();
//     useEffect(()=>{
//         if(!loginInitialized) {
//             setLoginInitialized(true);
//             console.log("Login not initialized")
//             fetch(uri, {
//                 method: "POST",
//                 headers,
//                 body: formBody,
//                 mode: "no-cors",
//                 credentials: 'include'
//             }).then((value)=>{
//                 console.log(value)
//                 return value.text()
//             }).then((token) => {
//                 setTokenIsSet(true);
//                 console.log("token was set", token);
//             });
            
//         }
        
//         // axios({
//         //     url,
//         //     method: "post",
//         //     headers: {
//         //         "Content-Type": "application/x-www-form-urlencoded",
//         //         'Access-Control-Allow-Origin': '*' 
//         //     },
//         //     params: {
//         //         username, password
//         //     },
//         //     responseType: "text"
//         // }).then((token)=>{
//         //     console.log(token);
//         //     setToken(token);
//         // }).catch((err) => {
//         //     console.error(err)
//         // });

//     }, [loginInitialized]);
    
//     return tokenIsSet;
// }


export const useLogin = () => {
    const [tokenIsSet, setTokenIsSet] = useState(null);
    useEffect(()=>{
        fetch("/login").then(()=>{
            console.log("logged in")
            setTokenIsSet(true)
        }).catch(console.error)
    }, [])

    return tokenIsSet
}