export = index;
export declare interface IRFC2822Data {
  phrase: string;
  address: string;
  comment: string;
  name: () => string;
  format: () => string;
  user: () => string;
  host: () => string;
}
declare class index {
  static parse(value: string): IRFC2822Data[];
}
declare module "address-rfc2822" {
}
