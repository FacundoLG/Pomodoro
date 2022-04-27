import { FC, MouseEventHandler, ReactNode, } from "react"
import styles from "./button.module.css"

type Style = "fill" | "bordered"

interface Props {
    children:ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    style?: Style
}

const Button:FC<Props> = ({children,onClick,style}) => {
  return (
    <button className={`${styles.button} ${style == "bordered"? styles.bordered : styles.fill }`} onClick={onClick && onClick}>{children}</button>
  )
}

export default Button