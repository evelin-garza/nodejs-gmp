import { UserInstance, UserModel } from '../types/user';

export default class AuthService {
  private userModel: UserInstance;

  constructor(userModel: UserInstance) {
    this.userModel = userModel;
  }

  findUser(login: string, password: string): Promise<Partial<UserModel> | null> {
    return this.userModel.findOne({ where: { login, password } });
  }
}
