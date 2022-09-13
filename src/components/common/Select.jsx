const Select = ({ options, name, label, value, error, onValueChange }) => {
  console.log(options);
  return (
    <div className="form-group">
      <label htmlFor="">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        class="form-select"
        onChange={onValueChange}
      >
        {options.map((option) => (
          <option value={options._id}>{option.name}</option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
