import { Store } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface IStoreRepositoryInterface {
  createOne(store: Store): Promise<Store>;
  update(id: string, store: Store): Promise<Store>;
  delete(id: string, store: Store): Promise<void>;
  get(id: string): Promise<Store>;
}

export class StoreRepository implements IStoreRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(store: Store): Promise<Store> {
    return this.prismaService.store.create({ data: store });
  }

  async update(id: string, store: Omit<Store, 'id'>): Promise<Store> {
    return this.prismaService.store.update({
      where: {
        id,
      },
      data: store,
    });
  }

  async delete(id: string): Promise<void> {
    this.prismaService.store.delete({
      where: {
        id,
      },
    });
  }

  async get(id: string): Promise<Store> {
    return this.prismaService.store.findUnique({
      where: {
        id,
      },
    });
  }
}
