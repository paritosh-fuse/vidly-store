import Joi from "joi-browser";

export const validate = (data, schema) => {
  const result = Joi.validate(data, schema, {
    abortEarly: false,
  });
  if (!result.error) return null;
  let errors = {};
  for (let item of result.error.details) errors[item.path[0]] = item.message;
  return errors;
};

export const validateProperty = (name, value, joi_schema) => {
  const obj = { [name]: value };
  const schema = { [name]: joi_schema[name] };
  const result = Joi.validate(obj, schema, { abortEarly: false });
  if (!result.error) return null;
  let errors = {};
  for (let item of result.error.details) errors[item.path[0]] = item.message;
  return errors;
};
