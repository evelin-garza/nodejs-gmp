import { FindOptions, Op } from 'sequelize';
import { User as UserModel } from '../models/user.model';
import { UserAttributes } from '../types/user';

export const getUsers = (loginSubstring = '', order = 'asc', includeDeleted = false, limit?: number): Promise<any> => {
  const options: FindOptions = {
    order: [['login', order]]
  };

  const where: any = {};

  if (loginSubstring) {
    where.login = { [Op.like]: `%${loginSubstring}%` };
  }

  if (!includeDeleted) {
    where.isDeleted = false;
  }

  options.where = where;

  if (limit) {
    options.limit = limit;
  }

  console.log('Get user list');
  return UserModel.findAll(options);
};

export const getUserById = (userId: number): Promise<any> => {
  console.log(`Get user by id: ${userId}`);
  return UserModel.findOne({
    where: {
      isDeleted: false,
      id: userId
    }
  });
};

export const createUser = async (user: UserAttributes): Promise<any> => {
  console.log('Create user');
  return UserModel.create(user);
};

export const updateUser = (userId: number, user: UserAttributes): Promise<any> => {
  console.log('Update user');
  return UserModel.update(user, {
    where: {
      isDeleted: false,
      id: userId
    },
    returning: true
  });
};

export const deleteUser = (userId: number): Promise<any> => {
  console.log(`Delete user with id: ${userId}`);
  return UserModel.update({ isDeleted: true }, {
    where: {
      isDeleted: false,
      id: userId
    },
    returning: true
  });
};
