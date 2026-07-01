export interface Connector {
  name: string;

  execute(
    action: string,
    payload?: unknown
  ): Promise<unknown>;
}
