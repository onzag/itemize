/// <reference types="react" />
/// <reference types="styled-jsx" />
import { Location } from "history";
interface ILocationRetrieverProps {
    children: (location: Location<any>) => React.ReactElement;
}
export default function LocationRetriever(props: ILocationRetrieverProps): import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>;
export {};
