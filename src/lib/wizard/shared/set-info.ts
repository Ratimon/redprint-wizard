export const TAG_SECURITY_CONTACT = `@custom:security-contact`;

export const infoOptions = [{}, { securityContact: 'security@example.com', license: 'WTFPL' }] as const;

export const defaults: Info = { license: 'MIT' };

export type Info = {
  securityContact?: string;
  license?: string;
}