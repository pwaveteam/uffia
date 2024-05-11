import Regis from "../page/regis";
import DefaultLayout from "../layout/DefaultLayout";

export interface RouteInterface {
  name: string
  path: string
  element: any
  child?: RouteInterface[]
}

const stepRouter: RouteInterface[] = [
  {name: '기본정보', path: '/regis/*', element: Regis}
]

export const Layout: RouteInterface[] = [
  {name: 'defualtLayout', path: '', element: DefaultLayout, child: stepRouter}
]
