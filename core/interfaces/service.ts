export interface Service {
  name: string;

  execute(
    action: string,
    payload?: unknown
  ): Promise<unknown>;
}
