import { useEffect, useState } from "react"
import {url} from "./config";
import auth from "../Data/token.json"
// let token = require("../Data/token.json")

// export const useEntries = ( tokenIsSet ) => {
//     const [entries, setEntries] = useState([]);

//     useEffect(()=>{
//         if(tokenIsSet) {
//             const formName = "WOI:WorkOrder"
//             const uri = `${url}/entry/${formName}`;
            
//             const headers = new Headers({
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'AR-JWT=' + auth.token 
//             });
//             console.log(headers);

//             fetch(uri, {
//                 headers,
//                 method: "GET",
//                 // mode: "no-cors",
//                 credentials: 'include'
//             })
//             .then((entries) => entries.json())
//             .then(() => {
//                 //Sets the entries to the work orders fetched above
//                 setEntries(entries.map((card) => {
//                     //adds work order id to the card.id
//                     card.id = card["Work Order ID"];
//                     return card;
//                 }))
//             })
//             .catch(console.error)
//         }
//     }, [tokenIsSet]);

//     return entries
// }


export const useEntries = (tokenSet) => {
    let [entries, setEntries] = useState([])
    useEffect(()=>{
        if(tokenSet && !entries.length) {
            fetch("/entries")
            .then((entries)=> entries.json())
            .then(entriesResponse =>{
                let entries = entriesResponse.entries
                .map((entry) => {
                    let newEntry = entry.values
                    newEntry.id = newEntry["Work Order ID"];
                    return newEntry
                })
                setEntries(entries)
            })
            .catch(console.error)
        }
        
    }, [tokenSet, entries]);

    return entries;
}