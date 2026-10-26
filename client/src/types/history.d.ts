declare module "history" {
  export interface IMemoryHistory {
    location: { pathname: string };
    push(path: string): void;
  }

  export function createMemoryHistory(options?: { initialEntries?: string[] }): IMemoryHistory;
}
