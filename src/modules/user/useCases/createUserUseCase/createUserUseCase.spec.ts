import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('is able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Fulano',
      password: '123123',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('is able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Fulano',
      password: userPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});
