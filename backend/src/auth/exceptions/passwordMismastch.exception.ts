import { BadRequestException } from '@nestjs/common';

export class PasswordMismatchException extends BadRequestException {
  constructor() {
    super(`Invalid password.`);
  }
}
