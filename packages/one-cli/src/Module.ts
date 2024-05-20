import { OnePluginProtocol, OnePluginRegistry, OnePluginServices } from '@one/plugin';
import { OneConfigFile, OneConfigService } from '@one/service';
import { OneServiceModule } from '@one/service-impl';
import { cosmiconfig } from 'cosmiconfig';
import { Container } from 'inversify';
import path from 'path';
import invariant from 'tiny-invariant';
import { OnePluginProtocolImpl } from './plugin-bridge/Protocol';
import { OnePluginRegistryImpl } from './plugin-bridge/Registry';
import { OnePluginServicesImpl } from './plugin-bridge/Services';
import { OneConfigFileParser } from './plugin-service/config/ConfigFileParser';
import { OneConfigServiceImpl } from './plugin-service/config/ConfigService';
import { OnePluginConnector } from './plugin-support/PluginConnector';
import { OnePluginLoader } from './plugin-support/PluginLoader';
import { OnePluginRunner } from './plugin-support/PluginRunner';

interface OneModuleOptions {
  mode: string;
}

export class OneModule {
  static async create(options: OneModuleOptions) {
    const container = new Container({
      defaultScope: 'Singleton',
    });
    // config
    container.bind(OneConfigService).to(OneConfigServiceImpl);
    container.bind(OneConfigFileParser).toSelf();
    container.bind(OneConfigFile).toDynamicValue(async (context) => {
      const explorer = cosmiconfig('one', {
        searchPlaces: [`.onerc`, `.onerc.json`],
      });
      const discovery = await explorer.search();

      invariant(discovery?.filepath, '[ConfigFile] explicit config file required');

      const configFile: OneConfigFile = {
        rcFile: discovery.filepath,
      };

      return configFile;
    });

    const configFile = await container.getAsync(OneConfigFile);

    // service impl
    container.load(
      OneServiceModule.create({
        // TODO - 暂定约定与配置文件同级
        root: path.dirname(configFile.rcFile),
        mode: options.mode,
        rcFile: configFile.rcFile,
        prefixes: ['NODE_', 'ONE_'],
      }),
    );

    // ignition
    container.bind(OnePluginRegistryImpl).toSelf();
    container.bind(OnePluginServices).toService(OnePluginServicesImpl);
    container.bind(OnePluginRegistry).toService(OnePluginRegistryImpl);
    container.bind(OnePluginProtocol).to(OnePluginProtocolImpl);
    container.bind(OnePluginLoader).toSelf();
    container.bind(OnePluginConnector).toSelf();
    container.bind(OnePluginRunner).toSelf();

    return container;
  }
}
