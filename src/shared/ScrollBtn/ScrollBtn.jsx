import Button from "../Button/Button";
import styles from "./ScrollBtn.module.css";

function ScrollBtn() {
  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <Button
      className={styles.scroll_btn}
      text="↑"
      handleEvent={() => scrollTop()}
    />
  );
}

export default ScrollBtn;
