export abstract class OneConfigFile {
  /**
   * 文件路径
   */
  abstract filepath: string;

  /**
   * 原始文件内容
   */
  abstract content: string;
}

export abstract class OneConfigService {
  abstract get<T>(key: string): T;
}
