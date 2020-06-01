export interface ISSRRule {
  language: string;
  languages: string[];
  rtl: boolean;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  collect: Array<[string, string, number, string]>;
  forUser: {
    token: string;
    id: number;
    role: string;
  };
}