import { BadRequestException } from '@nestjs/common';

export class UserAlreadyCreateException extends BadRequestException {
  constructor() {
    super(`User already created.`);
  }
}
