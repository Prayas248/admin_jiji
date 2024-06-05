
import { useState } from "react"
import './commenttoggle.css';
export function CommentToggle() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="toggleContainer">
      <span className={`toggleButton ${toggle ? "toggleTrue" : "toggleFalse"}`} onClick={() => {
        setToggle(!toggle);
      }}></span>
    </div>
  )
}
