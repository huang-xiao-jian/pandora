import { injectable } from 'inversify';

@injectable()
export abstract class OneConfigFile {
  /**
   * 配置文件绝对路径
   */
  rcFile: string;
}
