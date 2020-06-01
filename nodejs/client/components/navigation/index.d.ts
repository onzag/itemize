import { Location } from "history";
export declare function setHistoryState<S>(location: Location, state: Partial<S>, replace?: boolean): void;
export declare function setHistoryQSState<S>(location: Location, state: Partial<S>, replace?: boolean): void;
export declare function redirectTo(newLocation: string, state?: any, replace?: boolean): void;
export declare function localizedRedirectTo(newLocation: string, state?: any, replace?: boolean): void;
export declare function goBack(): void;
