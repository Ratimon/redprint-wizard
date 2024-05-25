export type OptionsErrorMessages = { [prop in string]?: string };

export class ContractOptionsError extends Error {
  constructor(readonly messages: OptionsErrorMessages) {
    super("Invalid options ");
  }
}
