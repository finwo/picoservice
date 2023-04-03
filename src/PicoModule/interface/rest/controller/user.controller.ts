import { Service } from '@finwo/di';
import { Controller, Req, Post, Get } from '@finwo/router';
import { FastifyRequest } from 'fastify';

import { User } from '@pico/domain/model/user.model';
import { UserDomain } from '@pico/domain/user';

@Service()
@Controller('/v1/pico/users')
export class UserController {
  constructor(
    private readonly domain: UserDomain,
  ) {}

  // Provides GET route for domain methods
  // Mapped to different methods for different behaviors which are commonly merged in REST
  @Get()
  async getUsers(
    @Req() req: FastifyRequest,
  ) {
    const name = (req.query as Record<string, string>).name;

    if (name) {
      return {
        ok   : true,
        data : await this.domain.findUserByName(name),
      };
    } else {
      return {
        ok   : true,
        data : await this.domain.findAllUsers(),
      };
    }
  }

  // Provides POST route for domain method
  @Post()
  async createUser(@Req() req: FastifyRequest) {
    const response = await this.domain.createUser(req.body as Partial<User>);

    return {
      ok   : true,
      data : response,
    };
  }
}
