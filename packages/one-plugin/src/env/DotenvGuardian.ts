import { DotenvParseOutput, DotenvPopulateInput } from 'dotenv';
import { injectable } from 'inversify';
import { pickBy, some, startsWith } from 'lodash';

export interface DotenvGuardianOptions {
  prefixes: string[];
}

/**
 * 支持白名单
 */
@injectable()
export class DotenvGuardian {
  guardian(options: DotenvGuardianOptions): DotenvParseOutput {
    const raw = { ...process.env } as DotenvPopulateInput;
    const passed = pickBy(raw, (value, key) => {
      return some(options.prefixes, (prefix) => startsWith(key, prefix));
    });

    return passed;
  }
}
