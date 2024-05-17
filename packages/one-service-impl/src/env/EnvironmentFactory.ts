import { OneEnvironmentService, WellknownEnvironment } from '@one/service';
import { injectable } from 'inversify';
import { assign } from 'lodash';
import { DotenvGuardian, DotenvGuardianOptions } from './DotenvGuardian';
import { DotenvParser } from './DotenvParser';
import { DotenvScanOptions, DotenvScanner } from './DotenvScanner';

export interface EnvironmentServiceFactoryOptions extends DotenvGuardianOptions, DotenvScanOptions {}

@injectable()
export class OneEnvironmentServiceFactory {
  constructor(
    private readonly dotenvGuardian: DotenvGuardian,
    private readonly dotenvParser: DotenvParser,
    private readonly dotenvScanner: DotenvScanner,
  ) {}

  async create(options: EnvironmentServiceFactoryOptions): Promise<OneEnvironmentService> {
    const env = this.dotenvGuardian.guardian(options);
    const contents = await this.dotenvScanner.scan(options);
    const basement = this.dotenvParser.parse(env, contents);
    // 添加通用型环境变量
    const wellknown: WellknownEnvironment = {
      root: options.dir,
      dirname: process.cwd(),
    };
    assign(basement, wellknown);

    const service: OneEnvironmentService = {
      get(key: string) {
        return basement[key];
      },
    };

    return service;
  }
}
