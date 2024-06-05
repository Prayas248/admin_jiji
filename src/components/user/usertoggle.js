
import { useState } from "react"
import './usertoggle.css';
export function UserToggle() {

  const [toggle, setToggle] = useState(false);
  return (
    <div className="usertoggleContainer">
      <span className={`usertoggleButton ${toggle ? "usertoggleTrue" : "usertoggleFalse"}`} onClick={() => {
        setToggle(!toggle);
      }}></span>
    </div>
  )
}
