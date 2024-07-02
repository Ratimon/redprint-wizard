export type OptionsErrorMessages = { [prop in string]?: string };

export class ContractOptionsError extends Error {
  constructor(readonly messages: OptionsErrorMessages) {
    //  to do add type check in form
    super("Invalid options ");
  }
}
