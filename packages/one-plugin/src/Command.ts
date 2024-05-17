export abstract class CommandRunner<A> {
  /**
   * 一次性执行动作
   */
  abstract run(args: A): Promise<void>;

  /**
   * 持续性执行动作
   */
  abstract watchRun(args: A): Promise<void>;
}
