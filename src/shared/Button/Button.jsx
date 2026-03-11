import styles from './Button.module.css'

function Button ({type, handleEvent, text, id, disabled, className} ){
   return (
      <button className={`${styles.btn} ${className} || ""}`} type={type? type: 'button'} onClick={handleEvent} id={id} disabled={disabled}>
       {text}
          </button>
   )
}
export default Button;