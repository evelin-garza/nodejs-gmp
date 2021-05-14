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
    console.log('Get group list');
    return this.groupModel.findAll({ include: this.includeUsers });
  }

  getGroupById(groupId: string): Promise<GroupModel | null> {
    console.log(`Get group by id: ${groupId}`);
    return this.groupModel.findByPk(groupId, { include: this.includeUsers });
  }

  createGroup(group: GroupAttributes): Promise<GroupModel | null> {
    console.log('Create group');
    return this.groupModel.create(group);
  }

  updateGroup(groupId: string, group: GroupAttributes): Promise<[number, GroupModel[]] | null> {
    console.log('Update group');
    return this.groupModel.update(group, {
      where: {
        id: groupId
      },
      returning: true
    });
  }

  deleteGroup(groupId: string): Promise<number | null> {
    console.log('Delete group');
    return this.groupModel.destroy({
      where: {
        id: groupId
      }
    });
  }
}
