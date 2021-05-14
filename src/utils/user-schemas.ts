import Joi from 'joi';

const passwordRegex = new RegExp(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/);

export const CreateUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain letters and numbers'
    }),
  age: Joi.number().min(4).max(130).required()
});

export const UpdateUserSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string()
    .pattern(passwordRegex)
    .messages({
      'string.pattern.base': 'Password must contain letters and numbers'
    }),
  age: Joi.number().min(4).max(130)
});

export const UsersQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1),
  loginSubstring: Joi.string(),
  order: Joi.string().valid('asc', 'desc'),
  includeDeleted: Joi.string().valid('true', 'false')
});

export const AddUsersToGroupSchema = Joi.object({
  groupId: Joi.string().required(),
  userIds: Joi.array().items(Joi.number()).unique().required()
});
