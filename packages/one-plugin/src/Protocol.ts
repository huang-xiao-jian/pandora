import { injectable } from 'inversify';
import { OnePluginRegistry } from './Registry';
import { OnePluginServices } from './Service';

@injectable()
export abstract class OnePluginProtocol {
  /**
   * 核心扩展点
   */
  registry: OnePluginRegistry;
  /**
   * 核心服务共享
   */
  services: OnePluginServices;
}
