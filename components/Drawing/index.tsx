'use client'

import styles from "./styles.module.scss"
import img from "./img.png"
import { useState } from "react"
import classNames from "classnames"

const DrawingContainer = () => {
  const [hideDrawing, setIsHideDrawing] = useState(false)
    return <div className={styles.container}>
      <button onClick={() => setIsHideDrawing(!hideDrawing)} className={styles.button}>{hideDrawing ? "Show drawing" : "Hide drawing"}</button>
      <div className={styles["background-image"]} style={{backgroundImage : img.src}}>
   {<div className={classNames(styles["overlay-div"], {"hidden" : hideDrawing})}>
    <Drawing/>
    </div>}
  </div>
</div>
}

export default DrawingContainer

const Drawing = () => {
  return( 
<>
<div className={styles.bottle}>
<div className={styles.cap}/>
<div className={styles.subcap}/>
<div className={styles.glass}/>
<div className={styles.milk}/>
<div className={styles.sticker}>MILK</div>
</div>
<svg viewBox="0 0 12 15" xmlns="http://www.w3.org/2000/svg" >
    <clipPath id="svg-shape" clipPathUnits="objectBoundingBox">
  <path  d="M0.228,0.002 C0.217,0.004,0.211,0.006,0.206,0.01 C0.201,0.015,0.201,0.015,0.201,0.049 L0.201,0.078,0.208,0.081 C0.212,0.082,0.217,0.083,0.22,0.083 C0.226,0.083,0.226,0.083,0.226,0.096 C0.226,0.109,0.227,0.109,0.233,0.112 C0.237,0.113,0.242,0.115,0.245,0.115 C0.251,0.115,0.251,0.115,0.251,0.122 C0.251,0.151,0.242,0.177,0.222,0.202 C0.202,0.227,0.18,0.247,0.102,0.309 C0.057,0.346,0.031,0.372,0.017,0.396 C0,0.423,0.001,0.402,0.002,0.696 L0.002,0.963,0.013,0.972 C0.026,0.983,0.046,0.991,0.073,0.996 L0.093,1,0.502,1 L0.911,1,0.932,0.996 C0.959,0.99,0.978,0.982,0.991,0.97 L1,0.963,1,0.696 C1,0.402,1,0.423,0.986,0.396 C0.972,0.372,0.946,0.346,0.9,0.309 C0.823,0.247,0.801,0.227,0.781,0.202 C0.761,0.177,0.752,0.151,0.752,0.122 C0.752,0.115,0.752,0.115,0.757,0.115 C0.761,0.115,0.766,0.113,0.77,0.112 C0.776,0.109,0.777,0.109,0.777,0.096 C0.777,0.083,0.777,0.083,0.782,0.083 C0.786,0.083,0.791,0.082,0.795,0.081 L0.802,0.078,0.802,0.046 C0.802,0.017,0.801,0.014,0.797,0.011 C0.791,0.006,0.786,0.004,0.775,0.002 C0.768,0,0.741,0,0.501,0 C0.263,0,0.234,0,0.228,0.002" />
</clipPath>
</svg>
</>
)}