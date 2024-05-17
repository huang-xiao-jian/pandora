import { injectable } from 'inversify';

export interface WellknownEnvironment {
  /**
   * 项目根目录，使用配置文件 .onerc 文件作为基准
   */
  root: string;
  /**
   * 命令执行路径
   */
  dirname: string;
}

@injectable()
export abstract class OneEnvironmentService {
  abstract get<K extends keyof WellknownEnvironment>(key: K): WellknownEnvironment[K];
  abstract get<T>(key: string): T;
  abstract getAll(): Record<string, string>;
}
