
import { useState } from "react"
import './coupontoggle.css';
export function CouponToggle({ ontoggle }) {

  const [toggle, setToggle] = useState(ontoggle); // Initialize with the value of ontoggle

  const handleToggleClick = () => {
    setToggle(!toggle); // Toggle state on click
  };
  return (
    <div className="toggleContainer">
      <span className={`toggleButton ${toggle ? "toggleTrue" : "toggleFalse"}`} onClick={handleToggleClick}></span>
    </div>
  )
}
