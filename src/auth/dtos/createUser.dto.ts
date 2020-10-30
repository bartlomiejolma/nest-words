import { User } from '../../users/user.interface';

export class CreateUserDto implements User {
  email: string;
  name: string;
  password: string;
}
