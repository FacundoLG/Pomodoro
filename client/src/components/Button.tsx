import { ButtonHTMLAttributes, DetailedHTMLProps, FC, MouseEventHandler, ReactNode, } from "react"
import styles from "./button.module.css"

type Style = "fill" | "bordered" | "danger" | "icon"

interface Props {
    children:ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean 
    style?: Style
    type?: "button" | "submit" | "reset" | undefined
}

const Button:FC<Props> = ({children,onClick,style,disabled,type}) => {
  return (
    <button className={`${styles.button} ${style == "bordered"? styles.bordered : style == "danger"? styles.danger : style == "icon"? styles.icon :  styles.fill }`} 
            onClick={onClick && onClick}
            disabled={disabled}
            type={type}
            >{children}</button>
  )
}

Button.defaultProps = {
  disabled: false,
  type: undefined
}

export default Button