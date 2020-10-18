export interface ISSRRule {
    language: string;
    languages: string[];
    rtl: boolean;
    forUser: {
        token: string;
        id: number;
        role: string;
    };
    noData: boolean;
}
