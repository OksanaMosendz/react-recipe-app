import styles from './Button.module.css'

function Button ({type, handleEvent, text, id, disabled} ){
   return (
      <button className={styles.btn} type={type? type: 'button'} onClick={handleEvent} id={id} disabled={disabled}>
       {text}
          </button>
   )
}
export default Button;