import { FileWatcher, OneConfigService, OneEnvironmentService } from '@one/service';

export abstract class OnePluginServiceAssociator {
  abstract use(identifier: 'Environment'): OneEnvironmentService;
  abstract use(identifier: 'Config'): OneConfigService;
  abstract use(identifier: 'FileWatcher'): FileWatcher;
  abstract use(): never;
}

export abstract class OnePluginProtocol {
  /**
   * 核心服务共享
   */
  abstract services: OnePluginServiceAssociator;
}
