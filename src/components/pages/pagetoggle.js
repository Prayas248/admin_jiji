
import { useState } from "react"
import './pagetoggle.css';
export function PageToggle() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="toggleContainer">
      <span className={`toggleButton ${toggle ? "toggleTrue" : "toggleFalse"}`} onClick={() => {
        setToggle(!toggle);
      }}></span>
    </div>
  )
}
