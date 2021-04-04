import Joi from 'joi';

const passwordRegex = new RegExp(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/);

const createUser = {
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain letters and numbers'
    }),
  age: Joi.number().min(4).max(130).required()
};

const updateUser = {
  id: Joi.string().required()
};

export const CreateUserSchema = Joi.object(
  Object.assign(createUser)
);

export const UpdateUserSchema = Joi.object(
  Object.assign(createUser, updateUser)
);

export const UsersQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1),
  loginSubstring: Joi.string(),
  order: Joi.string().valid('asc', 'desc')
});
