
import { useState } from "react"
import './ordertoggle.css';
export function OrderToggle() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="ordertoggleContainer">
      <span className={`ordertoggleButton ${toggle ? "ordertoggleTrue" : "ordertoggleFalse"}`} onClick={() => {
        setToggle(!toggle);
      }}></span>
    </div>
  )
}
