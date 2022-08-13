import { BadRequestException } from '@nestjs/common';

export class InvalidIDException extends BadRequestException {
  constructor() {
    super('Invalid ID');
  }
}
