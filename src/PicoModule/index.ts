import { Container } from 'typedi';

import { UserRepository } from '@pico/domain/repository/user.repository';
import { UserJsonFileRepository } from '@pico/infrastructure/repository/json-file/user.repository';

Container.set(UserRepository, UserJsonFileRepository);

export const PicoModule = {};
