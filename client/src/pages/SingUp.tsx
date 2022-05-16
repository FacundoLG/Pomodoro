import { FC } from "react"
import Button from "../components/Button"
import styles from "./sing.module.css"
const SingUp:FC = () => {
  return (
    <form className={styles.form}>
      <h1 className={styles.form_title}>Pomodoro</h1>
      <div className={styles.input_container}>
        <label htmlFor="">username</label>
        <input type="text" />
        <label htmlFor="">email</label>
        <input type="text" />
        <label htmlFor="">password</label>
        <input type="text" />
        <label htmlFor="">confirmation password</label>
        <input type="text" />
      </div>
      <Button> Singin </Button>
    </form>
  )
}

export default SingUp