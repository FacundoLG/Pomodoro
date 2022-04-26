import React, { FC, useState } from 'react'
import styles from "./header.module.css"
const Header:FC = () => {
    const [selectedTab,setSelectedTab] = useState<string>("Pomodoro")
  return (
    <div className={styles.header}>
        <button>Pomodoro</button>
        <button>Presets</button>
    </div>
  )
}

export default Header