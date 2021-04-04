import * as UserController from '../controllers/user-controller';
import { User } from '../models/user';

type UserQuery = {
  loginSubstring?: string,
  limit?: string,
  order?: string
};

type UserBody = {
  login: string;
  password: string;
  age: number;
};

export const getUsers = (query: UserQuery): Promise<User[]> => {
  const { loginSubstring, limit, order } = query;
  console.log('Get user list');
  return UserController.getAllUsers(loginSubstring, order, limit);
};

export const getUserById = (userId: string): Promise<User> => {
  console.log(`Get user by id: ${userId}`);
  return UserController.getUserById(userId);
};

export const createUser = (body: UserBody): Promise<User> => {
  const { login, password, age } = body;
  console.log('Create user');
  return UserController.createUser(login, password, age);
};

export const updateUser = (body: User): Promise<User> => {
  const { id, login, password, age } = body;
  console.log('Update user');
  return UserController.updateUser(id, login, password, age);
};

export const deleteUser = (userId: string): Promise<string> => {
  console.log(`Delete user with id: ${userId}`);
  return UserController.deleteUser(userId);
};
