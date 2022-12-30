import { useLocation } from "react-router-dom";
import { Location } from "history";

interface ILocationRetrieverProps {
  children: (location: Location<any>) => React.ReactElement;
}

export default function LocationRetriever(props: ILocationRetrieverProps) {
  const location = useLocation();
  return props.children(location);
}

export function useLocationRetriever() {
  const location = useLocation();
  return location;
}