import styles from './Logo.module.css'
import logo from "../../assets/img/logo.svg"
import bigLogo from "../../assets/img/bigLogo.svg"
function Logo({className}) {
 
   return <img src ={className==="logo-header"? bigLogo : logo} alt="logo" className={styles[className]} />
   
}

export default Logo;