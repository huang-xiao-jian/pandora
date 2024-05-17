import { OnePlugin } from '@one/plugin';
import { injectable } from 'inversify';

@injectable()
export class OnePluginLoader {
  /**
   * TODO - 支持灵活的模块，支持入参
   */
  load(pkgName: string): OnePlugin {
    const OnePlugin = require(pkgName);

    return new OnePlugin();
  }
}
