
import { useState } from "react"
import './producttoggle.css';
export function ProductToggle() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="toggleContainer">
      <span className={`toggleButton ${toggle ? "toggleTrue" : "toggleFalse"}`} onClick={() => {
        setToggle(!toggle);
      }}></span>
    </div>
  )
}
