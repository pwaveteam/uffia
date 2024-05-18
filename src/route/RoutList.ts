import Regis from "../page/regis";
import subRegis from "../page/subRegis";
import DefaultLayout from "../layout/DefaultLayout";
import Confirm from "../page/confirm";

export interface RouteInterface {
  name: string
  path: string
  element: any
  child?: RouteInterface[]
}

const stepRouter: RouteInterface[] = [
  {name: '기본 정보', path: '/regis/*', element: Regis},
  {name: '최종 페이지', path: '/subRegis/*', element: subRegis},
  {name: '결과 페이지', path: '/confirm/*', element: Confirm}
]

export const Layout: RouteInterface[] = [
  {name: 'defualtLayout', path: '', element: DefaultLayout, child: stepRouter}
]
