import styles from './InputWithLabel.module.css'
function InputWithLabel({ label, type, id, value, onChange, required }) {
  
   return (
    <div className={styles.input_wrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      required={required}
      ></input>
    </div>
  );
}

export default InputWithLabel;

