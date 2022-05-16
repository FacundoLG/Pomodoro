import { FC } from "react"

const SingUp:FC = () => {
  return (
    <form>
      <div>
        <h1>Pomodoro</h1>
      </div>
      <div>
        <label htmlFor="">username</label>
        <input type="text" />
        <label htmlFor="">email</label>
        <input type="text" />
        <label htmlFor="">password</label>
        <input type="text" />
        <label htmlFor="">confirmation password</label>
        <input type="text" />
      </div>
    </form>
  )
}

export default SingUp