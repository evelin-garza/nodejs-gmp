import { FindOptions, Op } from 'sequelize';
import { UserAttributes, UserInstance, UserModel } from '../types/user';

export default class UserService {
  private userModel: UserInstance;

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

    console.log('Get user list');
    return this.userModel.findAll(options);
  }

  getUserById(userId: number): Promise<UserModel | null> {
    console.log(`Get user by id: ${userId}`);
    return this.userModel.findOne({
      where: {
        isDeleted: false,
        id: userId
      }
    });
  }

  createUser(user: UserAttributes): Promise<UserModel | null> {
    console.log('Create user');
    return this.userModel.create(user);
  }

  updateUser(userId: number, user: UserAttributes): Promise<[number, UserModel[]] | null> {
    console.log('Update user');
    return this.userModel.update(user, {
      where: {
        isDeleted: false,
        id: userId
      },
      returning: true
    });
  }

  deleteUser(userId: number): Promise<[number, UserModel[]] | null> {
    console.log(`Delete user with id: ${userId}`);
    return this.userModel.update({ isDeleted: true }, {
      where: {
        isDeleted: false,
        id: userId
      },
      returning: true
    });
  }
}
