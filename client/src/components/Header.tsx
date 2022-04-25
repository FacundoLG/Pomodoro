import React from 'react'
import styles from "./header.module.css"
const Header = () => {
  return (
    <div className={styles.header}>
        <div>
            <div className={styles.tab_pointer}> 
            </div>
            <ul className={styles.tabs}>
                <li>
                    Pomodoro
                </li>
                <li>
                    Presets
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Header