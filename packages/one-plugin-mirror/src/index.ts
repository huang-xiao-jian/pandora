import { OnePlugin, type OnePluginProtocol } from '@one/plugin';

type MirrorDirection = 'forward' | 'backward' | 'bidirectional';

interface MirrorOptions {
  /**
   * 持续同步模式
   */
  watch: boolean;
  /**
   * 文件同步方向
   */
  direction: MirrorDirection;
}

class OnePluginMirror extends OnePlugin {
  apply(protocol: OnePluginProtocol): void {
    const command = protocol.registry.registerCommand({
      name: 'mirror',
      description: 'yet, sync two directories one way or the other',
    });

    command
      .argument('<from>', 'the original directory')
      .argument('<to>', 'the destiny directory')
      .option('-w,--watch', 'continuous sync directory')
      .option('-d, --direction [direction]', 'the direction for continuous work', 'forward')
      .action((from: string, to: string, options: MirrorOptions) => {
        console.group('OnePluginMirror');
        console.log('from: ', from);
        console.log('to: ', to);
        console.groupEnd();
      });
  }
}

export default OnePluginMirror;
