import { User } from '@pico/domain/model/user.model';

export abstract class UserRepository {
  public abstract saveUser(entity: User): Promise<boolean>;
  public abstract findAll(): Promise<User[]>;
  public abstract findByName(name: string): Promise<User[]>;
}
