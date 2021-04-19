/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
  id?: number;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }
export class User extends Model<UserModel, UserAttributes> { }

export type UserInstance = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
};
