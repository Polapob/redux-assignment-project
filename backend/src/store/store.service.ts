import { Store } from '@prisma/client';
import { CreateStoreDTO } from './dto/createStore.dto';
import { StoreRepository } from './store.repository';

interface IStoreService {
  createOne(createStoreDTO: CreateStoreDTO): Promise<Store>;
}

export class StoreService implements IStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}
  async createOne(createStoreDTO: CreateStoreDTO): Promise<Store> {
    throw new Error('Method not implemented.');
  }
}
