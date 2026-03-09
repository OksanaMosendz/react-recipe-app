function InputWithLabel({ label, type, id, value, onChange }) {
  
   return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}

export default InputWithLabel;
