import { createClient } from 'redis';
class RedisCacheService {
  private client: any;
  private isConnect = false;
  constructor() {
    this.client = createClient();
  }

  private async connectClient() {
    await this.client.connect();
    this.isConnect = true;
  }

  public async get(key: string) {
    if (!this.isConnect) {
      await this.connectClient();
    }
    return await this.client.get(key);
  }
  public async set(key: string, value: string) {
    if (!this.isConnect) {
      await this.connectClient();
    }
    return await this.client.set(key, value);
  }
  public async del(key: string) {
    if (!this.isConnect) {
      await this.connectClient();
    }
    return await this.client.del(key);
  }
}

const redisService = new RedisCacheService();

export default redisService;
//console.log(redisService.get('17e0249f-9c11-4944-be08-1e520f3dec11'));
