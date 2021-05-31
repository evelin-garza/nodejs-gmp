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

  getUsers(loginSubstring = '', order = 'asc', includeDeleted = false, limit?: number): Promise<UserModel[]> {
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

  getUserById(userId: number): Promise<UserModel | null> {
    return this.userModel.findOne({
      where: {
        isDeleted: false,
        id: userId
      },
      include: this.includeGroups
    });
  }

  createUser(user: UserAttributes): Promise<UserModel | null> {
    return this.userModel.create(user);
  }

  updateUser(userId: number, user: UserAttributes): Promise<[number, UserModel[]] | null> {
    return this.userModel.update(user, {
      where: {
        isDeleted: false,
        id: userId
      },
      returning: true
    });
  }

  deleteUser(userId: number): Promise<[number, UserModel[]] | null> {
    return this.userModel.update({ isDeleted: true }, {
      where: {
        isDeleted: false,
        id: userId
      },
      returning: true
    });
  }

  async addUsersToGroup(groupId: string, userIds: number[]): Promise<any> {
    const users = await Promise.all(userIds.map(async (userId: number) => {
      return await this.getUserById(userId);
    }));

    const group = await this.groupService.getGroupById(groupId);

    return db.transaction(async (t) => {
      return await Promise.all(users.map(async (user: any) => {
        return await user.addGroup(group, { transaction: t });
      }));
    });
  }
}
