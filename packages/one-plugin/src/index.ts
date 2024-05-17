import { OnePluginProtocol } from './Protocol';

export { OnePluginProtocol } from './Protocol';
export { OnePluginRegistry, type CommandDescriptor, type ConfigDescriptor } from './Registry';
export { OnePluginServices } from './Service';
export abstract class OnePlugin {
  abstract apply(protocol: OnePluginProtocol): void;
}
