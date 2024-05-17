import '@abraham/reflection';
import { program } from 'commander';
import { OneModule } from './Module';
import { OnePluginConnector } from './plugin-support/PluginConnector';
import { OnePluginRunner } from './plugin-support/PluginRunner';

interface InlineOptions {
  mode: string;
}

// 初始化主命令
program
  .enablePositionalOptions()
  .passThroughOptions()
  .name('one')
  .description('yet, vscode flavor architecture for pandora')
  .version('v0.1.0')
  .argument('<cmd>', 'the expect command for running')
  .option('-m, --mode <mode>', 'dotenv extended file', 'dev')
  .action(async (cmd: string, options: InlineOptions) => {
    const container = await OneModule.create({
      mode: options.mode,
    });

    // 插件连接阶段
    (await container.getAsync(OnePluginConnector)).connect();
    // 命令执行阶段
    (await container.getAsync(OnePluginRunner)).run(cmd);
  });

program.parseAsync();
