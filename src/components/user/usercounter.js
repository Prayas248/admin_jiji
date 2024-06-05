
import "./usercounter.css"
import { useState,useEffect } from "react"
import left from "../../assets/angle-circle-left.svg"
import right from "../../assets/angle-circle-right.svg"

export function UserCounter({onCountChange}) {

  const [count, setCount] = useState(0)
  useEffect(()=>{
    onCountChange(count);
  },[count])
  return (
    <div className="userCounterContainer">
      <img src={left} onClick={() => {
        setCount(count > 0 ? count - 1 : 0)
      }} />
      <span className="usercounterContainer"><span className="usercounter">{count}</span><span className="usercounterSmallText">of 27</span></span>
      <img src={right} onClick={() => {
        setCount(count < 27 ? count + 1 : 27)
      }} />
    </div>

  )
}
