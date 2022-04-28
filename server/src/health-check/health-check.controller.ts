import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  healthCheck(@Res() response: Response) {
    if (
      process.env.CLIENT_ID &&
      process.env.CLIENT_SECRET &&
      process.env.CLIENT_URL &&
      process.env.REDIRECT_URI
    ) {
      response.status(HttpStatus.OK).send('All good');
    } else {
      response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
