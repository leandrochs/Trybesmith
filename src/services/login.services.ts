import connection from '../models/connection';
import LoginModel from '../models/login.model';
import Login from '../interfaces/login.interface';
import Id from '../interfaces/id.interface';

class UserService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public getByUsernameAndPassword(login: Login): Promise<Id> {
    return this.model.getByUsernameAndPassword(login);
  }
}

export default UserService;
