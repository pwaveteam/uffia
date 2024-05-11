import DefaultLayout from "../layout/DefaultLayout";

export interface RouteInterface {
  name: string
  path: string
  element: any
  child?: RouteInterface[]
}

export const Layout: RouteInterface[] = [
  {name: 'defualtLayout', path: '', element: DefaultLayout}
]
