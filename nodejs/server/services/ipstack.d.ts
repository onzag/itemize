interface IPStackItemizeSpecificResponse {
    country: string;
    currency: string;
    language: string;
}
export declare class IPStack {
    private apiKey;
    constructor(apiKey: string);
    private requestInfoFor;
    requestUserInfoForIp(ip: string, fallback: IPStackItemizeSpecificResponse): Promise<IPStackItemizeSpecificResponse>;
}
export declare function setupIPStack(apiKey: string): IPStack;
export {};
