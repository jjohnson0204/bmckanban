import { useEffect } from "react";
import { useState } from "react";
import NewWOFom, { NewWOForm } from "./NewWOForm";

const NWO = (props) => {
    const [showForm, setShowForm] = useState(false)
    useEffect(()=>{

        console.log("form Companies", props.companies)
    }, [props.companies])
    return <div>
        <button onClick={()=> setShowForm(!showForm)}>New Work Order</button>
        {showForm ? <NewWOForm companies={props.companies} /> : null }
    </div>
}

export default NWO;