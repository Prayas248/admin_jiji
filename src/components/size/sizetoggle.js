
import { useState } from "react"
import './sizetoggle.css';
export function SizeToggle() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="toggleContainer">
      <span className={`toggleButton ${toggle ? "toggleTrue" : "toggleFalse"}`} onClick={() => {
        setToggle(!toggle);
      }}></span>
    </div>
  )
}
