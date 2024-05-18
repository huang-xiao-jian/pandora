import fse from 'fs-extra';
import { injectable } from 'inversify';
import { JsonObject } from 'type-fest';

@injectable()
export class OneConfigFileParser {
  /**
   * TODO - 支持环境变量插值，支持多配置文件
   */
  async parse(filepath: string): Promise<JsonObject> {
    const raw: JsonObject = await fse.readJson(filepath);

    return raw;
  }
}
