
const navOptions = ['tab', 'scroll'] as const;
export type NavOptions = typeof navOptions[number];

export interface Link {
    pathname: string;
    title: string;
    navType: NavOptions;
}
