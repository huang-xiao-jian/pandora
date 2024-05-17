import { OnePluginProtocol } from '@one/plugin';
import { OneConfigService } from '@one/service';
import { injectable } from 'inversify';
import { forEach, map } from 'lodash';
import { OnePluginLoader } from './PluginLoader';

@injectable()
export class OnePluginConnector {
  constructor(
    private readonly protocol: OnePluginProtocol,
    private readonly pluginLoader: OnePluginLoader,
    private readonly configService: OneConfigService,
  ) {}

  async connect() {
    const plugins = this.configService.get<string[]>('plugins');
    const instances = map(plugins, (plugin) => this.pluginLoader.load(plugin));

    forEach(instances, (instance) => {
      instance.apply(this.protocol);
    });
  }
}
