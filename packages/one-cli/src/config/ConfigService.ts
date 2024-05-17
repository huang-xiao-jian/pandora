import { OnePluginRegistry } from '@one/plugin';
import { OneConfigFile, OneConfigService } from '@one/service';
import { injectable, postConstruct } from 'inversify';
import { OneConfigFileParser } from './ConfigFileParser';

@injectable()
export class OneConfigServiceImpl extends OneConfigService {
  private configuration: Record<string, any> = {};

  constructor(
    private readonly registry: OnePluginRegistry,
    private readonly configFile: OneConfigFile,
    private readonly configFileParser: OneConfigFileParser,
  ) {
    super();
  }

  @postConstruct()
  async onInit() {
    // 解析原始配置文件
    this.configuration = await this.configFileParser.parse(this.configFile.rcFile);
    // TODO - 预校验配置
  }

  get<T>(key: string): T {
    return this.configuration[key] as T;
  }
}
