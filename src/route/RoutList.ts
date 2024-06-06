import DefaultLayout from "../layout/DefaultLayout";
import Uffia from "../page/uffia";

export interface RouteInterface {
  name: string;
  path: string;
  element: any;
  child?: RouteInterface[];
}

const stepRouter: RouteInterface[] = [
  { name: "uttia", path: "/uffia/*", element: Uffia },
];

export const Layout: RouteInterface[] = [
  {
    name: "defualtLayout",
    path: "",
    element: DefaultLayout,
    child: stepRouter,
  },
];
