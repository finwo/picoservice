import { Service } from 'typedi';
import { Get, Route, Post, Body, Query } from 'tsoa';
import { User } from '@pico/domain/model/user.model';
import { UserDomain } from '@pico/domain/user';

@Service()
@Route('/v1/pico/users')
export class UserController {
  constructor(
    private readonly domain: UserDomain,
  ) {}

  // Provides GET route for domain methods
  // Mapped to different methods for different behaviors which are commonly merged in REST
  @Get()
  async getUsers(
    @Query() name?: string,
  ) {
    if (name) {
      return this.domain.findUserByName(name);
    } else {
      return this.domain.findAllUsers();
    }
  }

  // Provides POST route for domain method
  @Post()
  async createUser(@Body() user: User) {
    return this.domain.createUser(user);
  }
}
