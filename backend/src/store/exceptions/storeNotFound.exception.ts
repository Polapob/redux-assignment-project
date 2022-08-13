import { NotFoundException } from '@nestjs/common';

export class StoreNotFoundException extends NotFoundException {
  constructor() {
    super('Store not found');
  }
}
