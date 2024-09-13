declare module "solc" {
    export function compile(input: string): string;
    export default { compile };
  }