import { useState } from "react";
import FormReasons from "./FormReasons";

const REASONS = (props) => {
  const [showReason, setShowReason] = useState(false)

  return
  
    {showReason ? <FormReasons /> : null}
}