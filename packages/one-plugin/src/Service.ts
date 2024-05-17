import { FileWatcher, OneConfigService, OneEnvironmentService } from '@one/service';
import { injectable } from 'inversify';

@injectable()
export abstract class OnePluginServices {
  abstract use(identifier: 'Config'): OneConfigService;
  abstract use(identifier: 'FileWatcher'): FileWatcher;
  abstract use(identifier: 'Environment'): OneEnvironmentService;
  abstract use(identifier: unknown): never;
}
