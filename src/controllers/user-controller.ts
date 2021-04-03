import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user";

let users: User[] = [];

export const getAllUsers = () => new Promise(resolve => resolve(users.filter((user: User) => !user.isDeleted)));

export const getUserById = (userId: string) => {
  return new Promise((resolve, reject) => {
    const foundUser = users.find((user: User) => user.id === userId && !user.isDeleted);
    if (foundUser) {
      resolve(foundUser);
    }
    reject(`No user found with id: ${userId}`);
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
    }
    reject(`No user found with id: ${id}`);
  });
};

export const deleteUser = (userId: string) => {
  return new Promise((resolve, reject) => {
    const foundIndex = users.findIndex((user: User) => user.id === userId && !user.isDeleted);
    if (foundIndex !== -1) {
      users[foundIndex].isDeleted = true;
      resolve('User was deleted successfully!');
    }
    reject(`No user found with id: ${userId}`);
  });
};