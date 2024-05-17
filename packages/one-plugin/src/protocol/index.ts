import { OnePluginProtocol } from './Protocol';

export abstract class OnePlugin {
  abstract apply(protocol: OnePluginProtocol): void;
}
