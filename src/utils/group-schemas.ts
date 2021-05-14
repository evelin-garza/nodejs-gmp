import Joi from 'joi';

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
export const CreateGroupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid(...permissions)).unique().required()
});

export const UpdateGroupSchema = Joi.object({
  name: Joi.string(),
  permissions: Joi.array().items(Joi.string().valid(...permissions)).unique()
});
