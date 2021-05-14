import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';
import { db } from '../models';
import { GroupInstance } from '../types/group';

export const GroupModel = (sequelize: Sequelize): GroupInstance => {
  return <GroupInstance>sequelize.define('groups', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    timestamps: false
  });
};

export const Group = GroupModel(db);
