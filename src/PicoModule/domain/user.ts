import { Service } from '@finwo/di';
import { User } from '@pico/domain/model/user.model';
import { UserRepository } from '@pico/domain/repository/user.repository';

@Service()
export class UserDomain {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  // Passthrough, no business logic here
  public async createUser(data: Partial<User>): Promise<User> {
    const user = User.fromData(data);

    if (!this.userRepository.saveUser(user)) {
      throw new Error('Unable to save user');
    }

    return user;
  }

  // Contains user logic
  public async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => {
      user.name = user.name.toUpperCase();
      return user;
    });
  }

  // No business logic here
  public async findUserByName(term: string): Promise<User[]> {
    return this.userRepository.findByName(term);
  }


}
