import { OnePlugin } from '@one/plugin';
import { OneEnvironmentService } from '@one/service';
import { injectable } from 'inversify';
import path from 'path';

@injectable()
export class OnePluginLoader {
  constructor(private readonly environmentService: OneEnvironmentService) {}

  /**
   * TODO - 支持灵活的模块，支持入参，支持安全模块加载机制
   */
  load(pkgName: string): OnePlugin {
    const pkg = require.resolve(pkgName, {
      paths: [
        path.resolve(this.environmentService.get('root'), 'node_modules'),
        path.resolve(this.environmentService.get('cwd'), 'node_modules'),
      ],
    });
    const OnePluginImpl = require(pkg);

    return new OnePluginImpl();
  }
}
