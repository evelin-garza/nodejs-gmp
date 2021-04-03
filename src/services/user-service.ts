import * as UserController from '../controllers/user-controller';
import { User } from '../models/user';

export const getUsers = () => {
  console.log('Get user list');
  return UserController.getAllUsers();
};

export const getUserById = (userId: string) => {
  console.log(`Get user by id: ${userId}`);
  return UserController.getUserById(userId);
};

export const createUser = (body: any) => {
  const { login, password, age } = body;
  console.log('Create user');
  return UserController.createUser(login, password, age);
};

export const updateUser = (body: User) => {
  const { id, login, password, age } = body;
  console.log('Update user');
  return UserController.updateUser(id, login, password, age);
};

export const deleteUser = (userId: string) => {
  console.log(`Delete user with id: ${userId}`);
  return UserController.deleteUser(userId);
};