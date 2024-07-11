export interface FeatureListItem {
    title: string;
    descriptions: string[];
    script: string
    highlight: string;
    iconName?: string;
}

export interface FeatureGridItem {
    title: string;
    description? : string;
    path?: string;
    iconName?: string;
}