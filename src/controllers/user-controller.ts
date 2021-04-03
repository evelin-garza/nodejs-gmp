import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user";
import { Constants } from '../utils/constants';
import { createErrorMessage } from '../utils/error-handler';

let users: User[] = [];

export const getAllUsers = () => new Promise(resolve => resolve(users.filter((user: User) => !user.isDeleted)));

export const getUserById = (userId: string) => {
  return new Promise((resolve, reject) => {
    const foundUser = users.find((user: User) => user.id === userId && !user.isDeleted);
    if (foundUser) {
      resolve(foundUser);
    } else {
      const error = createErrorMessage(
        Constants.HTTP_NOT_FOUND,
        Constants.NOT_FOUND_ERROR,
        `No user found with id: ${userId}.`
      );
      reject(error);
    }
  });
};

export const createUser = (
  login: string,
  password: string,
  age: number
) => {
  const newUser: User = {
    id: uuidv4(),
    login,
    password,
    age,
    isDeleted: false
  };

  users.push(newUser);

  return new Promise(resolve => resolve(newUser));
};

export const updateUser = (
  id: string,
  login: string,
  password: string,
  age: number
) => {
  return new Promise((resolve, reject) => {
    const foundIndex = users.findIndex((user: User) => user.id === id && !user.isDeleted);
    if (foundIndex !== -1) {
      users[foundIndex] = {
        id,
        login,
        password,
        age,
        isDeleted: false
      };
      resolve(users[foundIndex]);
    } else {
      const error = createErrorMessage(
        Constants.HTTP_NOT_FOUND,
        Constants.NOT_FOUND_ERROR,
        `Couldn't update user, id ${id} not found. `
      );
      reject(error);
    }
  });
};

export const deleteUser = (userId: string) => {
  return new Promise((resolve, reject) => {
    const foundIndex = users.findIndex((user: User) => user.id === userId && !user.isDeleted);
    if (foundIndex !== -1) {
      users[foundIndex].isDeleted = true;
      resolve('User was deleted successfully!');
    } else {
      const error = createErrorMessage(
        Constants.HTTP_NOT_FOUND,
        Constants.NOT_FOUND_ERROR,
        `Couldn't delete user, id ${userId} not found. `
      );
      reject(error);
    }
  });
};