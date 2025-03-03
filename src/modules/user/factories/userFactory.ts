import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@hotmail.com',
      name: 'Fulano',
      password: '123123',
      ...override,
    },
    id,
  );
};
