export type OptionsErrorMessages = { [prop in string]?: string };

export class DeployOptionsError extends Error {
  constructor(readonly messages: OptionsErrorMessages) {
    super("Invalid options ");
  }
}
