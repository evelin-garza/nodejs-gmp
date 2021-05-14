/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import { BuildOptions, Model } from 'sequelize';
import { Permission } from './permission';

export interface GroupAttributes {
  id?: string;
  name: string;
  permissions: Permission[];
}

export interface GroupModel extends Model<GroupAttributes>, GroupAttributes { }
export class Group extends Model<GroupModel, GroupAttributes> { }

export type GroupInstance = typeof Model & {
  new(values?: object, options?: BuildOptions): GroupModel;
};
