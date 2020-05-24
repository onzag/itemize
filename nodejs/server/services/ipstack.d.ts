interface IPStackItemizeSpecificResponse {
    country: string;
    currency: string;
    language: string;
}
export declare class IPStack {
    private apiKey;
    private httpsEnabled;
    constructor(apiKey: string, httpsEnabled: boolean);
    private requestInfoFor;
    requestUserInfoForIp(ip: string, fallback: IPStackItemizeSpecificResponse): Promise<IPStackItemizeSpecificResponse>;
}
export declare function setupIPStack(apiKey: string, httpsEnabled: boolean): IPStack;
export {};
