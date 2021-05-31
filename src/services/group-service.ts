import { User } from '../models/user.model';
import { GroupAttributes, GroupInstance, GroupModel } from '../types/group';

export default class GroupService {
  private groupModel: GroupInstance;
  includeUsers = [
    {
      model: User,
      as: 'users',
      attributes: ['login'],
      through: {
        attributes: []
      }
    }
  ];

  constructor(groupModel: GroupInstance) {
    this.groupModel = groupModel;
  }

  getGroups(): Promise<GroupModel[]> {
    return this.groupModel.findAll({ include: this.includeUsers });
  }

  getGroupById(groupId: string): Promise<GroupModel | null> {
    return this.groupModel.findByPk(groupId, { include: this.includeUsers });
  }

  createGroup(group: GroupAttributes): Promise<GroupModel | null> {
    return this.groupModel.create(group);
  }

  updateGroup(groupId: string, group: GroupAttributes): Promise<[number, GroupModel[]] | null> {
    return this.groupModel.update(group, {
      where: {
        id: groupId
      },
      returning: true
    });
  }

  deleteGroup(groupId: string): Promise<number | null> {
    return this.groupModel.destroy({
      where: {
        id: groupId
      }
    });
  }
}
