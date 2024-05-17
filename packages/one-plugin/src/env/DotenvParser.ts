import { DotenvParseOutput, parse, type DotenvPopulateInput } from 'dotenv';
import { expand } from 'dotenv-expand';
import { injectable } from 'inversify';
import { assign, map, reduce } from 'lodash';
import invariant from 'tiny-invariant';
import { DotenvGuardian } from './DotenvGuardian';

@injectable()
export class DotenvParser {
  constructor(private readonly dotenvGuardian: DotenvGuardian) {}

  parse(processEnv: DotenvPopulateInput, contents: Buffer[]): DotenvParseOutput {
    const parsed = map(contents, (content) => parse(content));
    const acc = reduce<DotenvParseOutput, DotenvParseOutput>(parsed, (acc, curr) => assign(acc, curr), {});
    const expansion = expand({
      processEnv,
      parsed: acc,
    });

    invariant(expansion.parsed, '[DotenvParser] extend dotenv exception');

    return expansion.parsed;
  }
}
