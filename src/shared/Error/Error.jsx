import styles from "./Error.module.css";
import errorImg from "../../assets/img/errorImg.svg";
function Error({ error }) {
  return (
    <div className={styles.error}>
      <img src={errorImg} alt="error" />
      <p>Sorry...Something went wrong.</p>
      <p>{error}</p>
    </div>
  );
}

export default Error;
