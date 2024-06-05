
import "./cardcounter.css"
import { useState } from "react"
import left from "../../assets/angle-circle-left.svg"
import right from "../../assets/angle-circle-right.svg"

export function CardCounter() {

  const [count, setCount] = useState(0)

  return (
    <div className="invoiceCounterContainer">
      <img src={left} onClick={() => {
        setCount(count > 0 ? count - 1 : 0)
      }} />
      <span className="counterContainer"><span className="counter">{count}</span><span className="counterSmallText">of 27</span></span>
      <img src={right} onClick={() => {
        setCount(count < 27 ? count + 1 : 27)
      }} />
    </div>

  )
}
