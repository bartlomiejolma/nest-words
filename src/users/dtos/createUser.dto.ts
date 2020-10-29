import { User } from '../user.interface';

export class CreateUserDto implements User {
  email: string;
  name: string;
  password: string;
}
