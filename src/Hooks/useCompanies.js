import { useEffect, useState } from "react"

export const useCompanies = (tokenSet) => {
    let [companies, setCompanies] = useState([])
    useEffect(()=>{
        if(tokenSet && !companies.length) {
            fetch("/companies")
            .then((entries)=> entries.json())
            .then(entriesResponse =>{
                let companies = entriesResponse?.entries.filter(entry => {
                    return entry.Status == 'enabled'
                }).map((entry) => {
                    return entry.Company;
                })
                .map((entry) => {
                    let newEntry = entry.values
                    newEntry.id = newEntry["Company"];
                    return newEntry
                })
                setCompanies(companies)
            })
            .catch(console.error)
        }
        
    }, [tokenSet, companies]);

    return companies;
}