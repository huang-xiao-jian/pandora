import { OnePluginProtocol } from './Protocol';

export { type OnePluginProtocol } from './Protocol';
export abstract class OnePlugin {
  abstract apply(protocol: OnePluginProtocol): void;
}
