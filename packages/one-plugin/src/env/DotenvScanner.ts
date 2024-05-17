import fse from 'fs-extra';
import { injectable } from 'inversify';
import { filter, map } from 'lodash';
import path from 'path';

export interface DotenvScanOptions {
  /**
   * 使用绝对路径，.env 文件相对目录
   */
  dir: string;
  /**
   * .env.${mode}
   */
  mode: string;
}

@injectable()
export class DotenvScanner {
  async scan(options: DotenvScanOptions): Promise<Buffer[]> {
    // TODO - validate options
    const candidates: string[] = ['.env', '.env.local', `.env.${options.mode}`, `.env.${options.mode}.local`];
    const filepaths = filter(
      map(candidates, (name) => path.resolve(options.dir, name)),
      (filepath) => fse.pathExistsSync(filepath),
    );
    const contents = await Promise.all(map(filepaths, (filepath) => fse.readFile(filepath)));

    return contents;
  }
}
