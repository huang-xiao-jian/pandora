import { OnePluginServices } from '@one/plugin';
import { FileWatcher, OneConfigService, OneEnvironmentService } from '@one/service';
import { injectable } from 'inversify';

@injectable()
export class OnePluginServicesImpl implements OnePluginServices {
  constructor(
    private configService: OneConfigService,
    private environmentService: OneEnvironmentService,
  ) {}

  use(identifier: 'Config'): OneConfigService;
  use(identifier: 'FileWatcher'): FileWatcher;
  use(identifier: 'Environment'): OneEnvironmentService;
  use(identifier: unknown): never;
  use(identifier: unknown): OneConfigService | FileWatcher | OneEnvironmentService {
    if (identifier === 'Config') {
      return this.configService;
    }

    if (identifier === 'Environment') {
      return this.environmentService;
    }

    throw new Error('[OnePluginServices] service not provided');
  }
}
