const Input = ({ id, placeholder, func }) => {
  return (
    <input
      {...func}
      id={id}
      placeholder={placeholder}
      className="border h-12 rounded-sm px-5"
    ></input>
  );
};

export default Input;
