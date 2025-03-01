import { User } from 'src/modules/user/entities/User';

export class UserViewModel {
  static toHttp({ createdAt, email, id, name }: User) {
    return {
      id,
      name,
      email,
      createdAt,
    };
  }
}
