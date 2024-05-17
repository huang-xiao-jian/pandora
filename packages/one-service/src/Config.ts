import { injectable } from 'inversify';

@injectable()
export abstract class OneConfigService {
  abstract get<T>(key: string): T;
}
