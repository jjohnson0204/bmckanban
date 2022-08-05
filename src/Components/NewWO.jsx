import { useState } from "react";
import NewWOFom, { NewWOForm } from "./NewWOForm";

const NWO = (props) => {
    const [showForm, setShowForm] = useState(false)

    return <div>
        <button onClick={()=> setShowForm(!showForm)}>New Work Order</button>
        {showForm ? <NewWOForm /> : null }
    </div>
}

export default NWO;