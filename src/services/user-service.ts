import { FindOptions, Op } from 'sequelize';
import { db } from '../models';
import { UserAttributes, UserInstance, UserModel } from '../types/user';
import GroupService from '../services/group-service';
import { Group } from '../models/group.model';

export default class UserService {
  private userModel: UserInstance;
  private groupService = new GroupService(Group);
  includeGroups = [
    {
      model: Group,
      as: 'groups',
      attributes: ['id', 'name'],
      through: {
        attributes: []
      }
    }
  ];

  constructor(userModel: UserInstance) {
    this.userModel = userModel;
  }

  getUsers(loginSubstring = '', order = 'asc', includeDeleted = false, limit?: number): Promise<Partial<UserModel>[]> {
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

    options.include = this.includeGroups;

    return this.userModel.findAll(options);
  }

  getUserById(userId: number): Promise<Partial<UserModel> | null> {
    return this.userModel.findOne({
      where: {
        isDeleted: false,
        id: userId
      },
      include: this.includeGroups
    });
  }

  getUsersByIds(userIds: number[]): Promise<UserModel[] | null> {
    return this.userModel.findAll({
      where: {
        isDeleted: false,
        id: {
          [Op.in]: userIds
        }
      },
      include: this.includeGroups
    });
  }

  createUser(user: UserAttributes): Promise<Partial<UserModel> | null> {
    return this.userModel.create(user);
  }

  updateUser(userId: number, user: UserAttributes): Promise<[number, Partial<UserModel>[]] | null> {
    return this.userModel.update(user, {
      where: {
        isDeleted: false,
        id: userId
      },
      returning: true
    });
  }

  deleteUser(userId: number): Promise<[number, Partial<UserModel>[]] | null> {
    return this.userModel.update({ isDeleted: true }, {
      where: {
        isDeleted: false,
        id: userId
      },
      returning: true
    });
  }

  async addUsersToGroup(groupId: string, userIds: number[]): Promise<any> {
    const usersQuery = this.getUsersByIds(userIds);
    const groupQuery = this.groupService.getGroupById(groupId);

    const [users, group] = await Promise.all([usersQuery, groupQuery]);

    if (!users || !group) {
      return 0;
    }

    return db.transaction(async (t) => {
      const count = await Promise.all(users.map((user: any) => {
        return user.addGroup(group, { transaction: t });
      }));
      return count.length;
    });
  }
}
