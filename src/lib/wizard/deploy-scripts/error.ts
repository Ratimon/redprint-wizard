export type DeployOptionsErrorMessages = { [prop in string]?: string };

export class DeployOptionsError extends Error {
  constructor(readonly messages: DeployOptionsErrorMessages) {
    super("Invalid options ");
  }
}
