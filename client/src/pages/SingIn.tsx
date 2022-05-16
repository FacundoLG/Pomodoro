import { FC } from "react"
import Button from "../components/Button"
import styles from "./sing.module.css"
const SingIn:FC = () => {
  return (
    <form className={styles.form}>
      <h1 className={styles.form_title}>Pomodoro</h1>
      <div className={styles.input_container}>
        <label htmlFor="">username</label>
        <input type="text" />
        <label htmlFor="">password</label>
        <input type="text" />
      </div>
      <Button> Singin </Button>
    </form>
  )
}

export default SingIn