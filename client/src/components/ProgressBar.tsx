import React, { FC, useEffect, useState } from 'react'
import styles from "./progressbar.module.css"

interface Props {
  percentage: number
  minutes?: string
  seconds?: string
}

const ProgressBar:FC<Props> = ({percentage,minutes,seconds}) => {
  const [progress,setProgress] = useState<number>(0)
  useEffect(() => {
    const inverse = 100 - percentage
    const fixed = 136 + inverse * 8.6455
    setProgress(fixed)
  },[percentage])
  return (
    <div className={styles.progress_container}>
      <svg className={styles.progress_bar} width="296" height="296" viewBox="0 0 296 296" fill="none" xmlns="http://www.w3.org/2000/svg">   
          <path strokeDashoffset={progress}  d="M284.422 130.816C286.679 148.731 285.384 166.916 280.613 184.331C275.842 201.746 267.688 218.051 256.616 232.314C245.543 246.578 231.77 258.521 216.082 267.462C200.394 276.402 183.099 282.165 165.184 284.422C147.269 286.679 129.084 285.384 111.669 280.613C94.2542 275.842 77.9494 267.688 63.6858 256.616C49.4222 245.543 37.4791 231.77 28.5384 216.082C19.5977 200.394 13.8346 183.099 11.578 165.184C9.32137 147.269 10.6155 129.084 15.3865 111.669C20.1576 94.2542 28.312 77.9494 39.3843 63.6858C50.4566 49.4222 64.2299 37.4791 79.9178 28.5384C95.6058 19.5977 112.901 13.8346 130.816 11.578C148.731 9.32137 166.916 10.6155 184.331 15.3866C201.746 20.1576 218.051 28.312 232.314 39.3843C246.578 50.4566 258.521 64.2299 267.462 79.9179C276.402 95.6058 282.165 112.901 284.422 130.816L284.422 130.816Z" stroke="#3D348B" strokeWidth="21"/>
      </svg>
      <p className={styles.progress_time}>{ minutes && seconds &&( minutes + ":" + seconds)}</p>
    </div>
  )
}

export default ProgressBar