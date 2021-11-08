import { CrudController } from '../';
import * as User  from '../../model/User/User';

export class UserController  extends CrudController {

  constructor () {
    super(User, '_id');
  }

}