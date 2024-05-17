export abstract class OneConfigService {
  abstract get<T>(key: string): T;
}
