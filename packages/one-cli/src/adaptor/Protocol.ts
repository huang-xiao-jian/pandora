import { OnePluginProtocol, OnePluginRegistry, OnePluginServices } from '@one/plugin';
import { injectable } from 'inversify';

@injectable()
export class OnePluginProtocolImpl implements OnePluginProtocol {
  constructor(
    public readonly services: OnePluginServices,
    public readonly registry: OnePluginRegistry,
  ) {}
}
