import { type WatchOptions } from 'chokidar';
import { type Stats } from 'fs';
import { injectable } from 'inversify';
import { type AsyncSeriesHook } from 'tapable';

export interface FileWatchDelegateHooks {
  add: AsyncSeriesHook<[filepath: string, stat?: Stats]>;
}

export abstract class FileWatchDelegator {
  abstract readonly hooks: FileWatchDelegateHooks;

  /**
   * 资源释放
   */
  abstract dispose(): void;
}

@injectable()
export abstract class FileWatcher {
  abstract watch(paths: string | string[], options?: WatchOptions): FileWatchDelegator;
}
