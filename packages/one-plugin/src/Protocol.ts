import { OnePluginRegistry } from './Registry';
import { OnePluginServices } from './Service';

export interface OnePluginProtocol {
  /**
   * 核心扩展点
   */
  registry: OnePluginRegistry;
  /**
   * 核心服务共享
   */
  services: OnePluginServices;
}
