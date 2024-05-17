import { FileWatcher, OneConfigService, OneEnvironmentService } from '@one/service';

export abstract class OnePluginServices {
  abstract use(identifier: 'Config'): OneConfigService;
  abstract use(identifier: 'FileWatcher'): FileWatcher;
  abstract use(identifier: 'Environment'): OneEnvironmentService;
  abstract use(): never;
}
