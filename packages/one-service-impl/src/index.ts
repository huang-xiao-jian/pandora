import { OneEnvironmentService } from '@one/service';
import { ContainerModule } from 'inversify';
import { DotenvGuardian } from './env/DotenvGuardian';
import { DotenvParser } from './env/DotenvParser';
import { DotenvScanner } from './env/DotenvScanner';
import { EnvironmentServiceFactoryOptions, OneEnvironmentServiceFactory } from './env/EnvironmentFactory';

interface OneServiceModuleOptions extends EnvironmentServiceFactoryOptions {
  /**
   * 配置文件绝对地址
   */
  rcFile: string;
}

export class OneServiceModule {
  static create(options: OneServiceModuleOptions) {
    return new ContainerModule((bind) => {
      // environment
      bind(DotenvGuardian).toSelf();
      bind(DotenvParser).toSelf();
      bind(DotenvScanner).toSelf();
      bind(OneEnvironmentServiceFactory).toSelf();
      bind(OneEnvironmentService).toDynamicValue(async (context) => {
        return context.container.get(OneEnvironmentServiceFactory).create(options);
      });
    });
  }
}
