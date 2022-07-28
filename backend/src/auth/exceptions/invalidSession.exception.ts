import { UnauthorizedException } from '@nestjs/common';

export class InvalidSessionException extends UnauthorizedException {
  constructor() {
    super(`Invalid session id.`);
  }
}
