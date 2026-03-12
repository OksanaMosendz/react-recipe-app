import styles from "./Logo.module.css";
import bigLogo from "../../assets/img/bigLogo.svg";

function Logo({ className }) {
  return <img src={bigLogo} alt="logo" className={styles[className]} />;
}

export default Logo;
