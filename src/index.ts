import 'reflect-metadata';
import 'module-alias/register';

import Fastify from 'fastify';
import { plugin } from '@finwo/router-fastify';
const app = Fastify();

import { PicoModule } from './PicoModule';

// Build a list of controllers we'll start our application with
// Classes registered as controller will NOT be included by default
const controllers: any[] = [
  ...PicoModule.controllers,
];

// Register your controllers' routes
app.register(plugin, controllers);

// And start listening
app.listen({
  port: parseInt(process.env.PORT || '5000'),
}, (err: any, addr: any) => {
  if (err) throw err;
  console.log(`PicoService listening on ${addr}`);
});

// Shutdown when receiving a sigterm
// Prevents being killed after timeout in ECS
process.on('SIGTERM', () => {
  if (!app) return;
  app.close();
});
