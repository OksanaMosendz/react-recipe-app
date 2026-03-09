function InputWithLabel({ label, type, id, value, onChange, required }) {
  
   return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      required={required}
      ></input>
    </>
  );
}

export default InputWithLabel;
