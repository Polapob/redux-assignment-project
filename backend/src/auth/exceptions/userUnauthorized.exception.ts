import { UnauthorizedException } from '@nestjs/common';

export class UserUnauthorizeException extends UnauthorizedException {
  constructor() {
    super(`You must authorize first to get a permission`);
  }
}
