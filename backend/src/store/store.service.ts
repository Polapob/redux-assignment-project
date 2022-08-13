import { Store } from '@prisma/client';
import { now } from 'mongoose';
import { CreateStoreDTO } from './dto/createStore.dto';
import { StoreRepository } from './store.repository';
import { ObjectId } from 'bson';
import { StoreNotFoundException } from './exceptions/storeNotFound.exception';
import { UpdateStoreDTO } from './dto/updateStore.dto';
import { NotHavePermissionException } from './exceptions/notHavePermission';

interface IStoreService {
  createOne(createBy: string, createStoreDTO: CreateStoreDTO): Promise<Store>;
  get(id: string): Promise<Store>;
  update(
    id: string,
    updateBy: string,
    updateStoreDTO: UpdateStoreDTO,
  ): Promise<Store>;
  delete(id: string, deleteBy: string): Promise<void>;
}

export class StoreService implements IStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}
  async createOne(
    createBy: string,
    createStoreDTO: CreateStoreDTO,
  ): Promise<Store> {
    const { name, address, phoneNumber } = createStoreDTO;
    return this.storeRepository.createOne({
      id: new ObjectId().toString(),
      name,
      address,
      phoneNumber,
      createBy,
      createdAt: now(),
      updatedAt: now(),
    });
  }
  async get(id: string): Promise<Store> {
    return this.storeRepository.get(id);
  }

  async update(id: string, updateBy: string, updateStoreDTO: UpdateStoreDTO) {
    const getStore = await this.storeRepository.get(id);
    if (!!getStore) {
      throw new StoreNotFoundException();
    }
    const { name, address, phoneNumber } = updateStoreDTO;
    if (updateBy != getStore.createBy) {
      throw new NotHavePermissionException();
    }

    return this.storeRepository.update(id, {
      name,
      address,
      phoneNumber,
      createBy: updateBy,
      createdAt: getStore.createdAt,
      updatedAt: now(),
    });
  }

  async delete(id: string, deleteBy: string) {
    const getStore = await this.storeRepository.get(id);
    if (!!getStore) {
      throw new StoreNotFoundException();
    }

    if (getStore.createBy !== deleteBy) {
      throw new NotHavePermissionException();
    }

    await this.storeRepository.delete(id);
  }
}
