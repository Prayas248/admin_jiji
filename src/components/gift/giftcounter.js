
import "./giftcounter.css"
import { useState } from "react"
import left from "../../assets/angle-circle-left.svg"
import right from "../../assets/angle-circle-right.svg"

export function GiftCounter() {

  const [count, setCount] = useState(0)

  return (
    <div className="giftCounterContainer">
      <img src={left} onClick={() => {
        setCount(count > 0 ? count - 1 : 0)
      }} />
      <span className="giftcounterContainer"><span className="giftcounter">{count}</span><span className="giftcounterSmallText">of 27</span></span>
      <img src={right} onClick={() => {
        setCount(count < 27 ? count + 1 : 27)
      }} />
    </div>

  )
}
