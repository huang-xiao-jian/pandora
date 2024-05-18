import { injectable } from 'inversify';
import { OnePluginRegistryImpl } from '../adaptor/Registry';

@injectable()
export class OnePluginRunner {
  constructor(private readonly registry: OnePluginRegistryImpl) {}

  /**
   * TODO - 命令存在检测
   */
  async run(cmd: string) {
    await this.registry.commands[cmd]?.parseAsync(process.argv.slice(1));
  }
}
