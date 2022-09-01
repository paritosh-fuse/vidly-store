const Input = ({ type, name, label, value, error, onValueChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="">{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onValueChange}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
