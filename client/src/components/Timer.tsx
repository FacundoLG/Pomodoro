import React from 'react'
import styles from "./timer.module.css"
const Timer = () => {
  return (
    <div className={styles.timer}>
        <div className={styles.progress_container}>
            <p className={styles.time}>12:31</p>
            <div className={styles.pomodoro_state}>
                <div className={styles.state_dot}></div>
                <div className={styles.state_dot}></div>
                    <div className={styles.progress_bar}><div></div></div>
                <div className={styles.state_dot}></div>
                <div className={styles.state_dot}></div>
            </div>
        </div>
        <div className={styles.controler}>
            <button>Pausa</button>
            <button>Reset</button>
        </div>
    </div>
  )
}

export default Timer