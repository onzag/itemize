interface IPStackResponse {
    ip: string;
    type: "ipv4" | "ipv6";
    continent_code: string;
    continent_name: string;
    country_code: string;
    region_code: string;
    region_name: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
    location: {
        geoname_id: number;
        capital: string;
        languages: Array<{
            code: string;
            name: string;
            native: string;
        }>;
        country_flag: string;
        country_flag_emoji: string;
        country_flag_emoji_unicode: string;
        calling_code: string;
        is_eu: boolean;
    };
}
interface IPStackItemizeSpecificResponse {
    country: string;
    currency: string;
    language: string;
}
export declare class IPStack {
    private apiKey;
    constructor(apiKey: string);
    requestInfoFor(ip: string): Promise<IPStackResponse>;
    requestUserInfoForIp(ip: string, fallback: IPStackItemizeSpecificResponse): Promise<IPStackItemizeSpecificResponse>;
}
export declare function setupIPStack(apiKey: string): IPStack;
export {};
