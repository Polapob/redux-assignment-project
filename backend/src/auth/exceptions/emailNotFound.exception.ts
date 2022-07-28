import { NotFoundException } from '@nestjs/common';

export class EmailNotFoundException extends NotFoundException {
  constructor() {
    super(`User's email not found in database.`);
  }
}
