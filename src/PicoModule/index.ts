import { Container } from 'typedi';

import { UserRepository } from '@pico/domain/repository/user.repository';
import { UserJsonFileRepository } from '@pico/infrastructure/repository/json-file/user.repository';

// Use UserJsonFileRepository for UserRepository
Container.set(UserRepository, Container.get(UserJsonFileRepository));

export const PicoModule = {};
