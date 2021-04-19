import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../models';
import { UserInstance } from '../types/user';

export const UserModel = (sequelize: Sequelize): UserInstance => {
  return <UserInstance>sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 4, max: 130 }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false
  });
};

export const User = UserModel(db);
