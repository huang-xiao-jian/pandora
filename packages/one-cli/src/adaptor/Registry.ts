import { CommandDescriptor, ConfigDescriptor, OnePluginRegistry } from '@one/plugin';
import { Command, createCommand } from 'commander';
import { injectable } from 'inversify';

@injectable()
export class OnePluginRegistryImpl extends OnePluginRegistry {
  /**
   * 暂存命令集合
   */
  commands: Record<string, Command> = {};

  /**
   * 暂存配置项
   */
  configs: Record<string, ConfigDescriptor<any>> = {};

  /**
   * 注册配置项
   */
  registryConfig<T>(descriptor: ConfigDescriptor<T>): void {
    this.configs[descriptor.key] = descriptor;
  }
  /**
   * 注册子命令
   */
  registerCommand(descriptor: CommandDescriptor): Command {
    const command = createCommand();

    this.commands[descriptor.name] = command;
    this.commands[descriptor.name].name(descriptor.name).description(descriptor.description);

    return command;
  }
}
