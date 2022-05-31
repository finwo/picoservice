import 'reflect-metadata';
import 'module-alias/register';

import { Server } from 'http';
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from './routes';

import { PicoModule } from './PicoModule';

export const app = express();
const port = parseInt(process.env.PORT || '5000');

app.get('/health', (_req, res, _next) => {
  res.sendStatus(200);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message,
    });
  }

  next();
});

let server: Server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => console.log(`Payday Service listening on :${port}`));
}

// Shutdown when receiving a sigterm
// Prevents being killed after timeout in ECS
process.on('SIGTERM', () => {
  if (!server) return;
  server.close();
});
