import { type Schema } from 'joi';

export interface CommandDescriptor {
  /**
   * 子命令名称
   */
  name: string;
  /**
   * 子命令功能描述
   */
  description: string;
}

export interface ConfigDescriptor<T> {
  /**
   * 统一配置文件属性 Key
   */
  key: string;
  /**
   * 统一配置文件属性值校验
   */
  schema: Schema<T>;
  /**
   * 统一配置文件属性默认值
   */
  default?: (rcFile: string) => T;
}

export abstract class OnePluginRegistry {
  /**
   * 注册子命令
   */
  abstract registerCommand(descriptor: CommandDescriptor): void;
  /**
   * 注册配置项
   */
  abstract registryConfigItem<T>(descriptor: ConfigDescriptor<T>): void;
}
