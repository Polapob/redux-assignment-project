import { NotAcceptableException } from '@nestjs/common';

export class NotHavePermissionException extends NotAcceptableException {
  constructor() {
    super("You don't have a permission to change the store");
  }
}
