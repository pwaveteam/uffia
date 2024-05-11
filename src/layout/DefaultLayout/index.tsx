import {Outlet} from "react-router-dom"
import {useRecoilValue} from "recoil";
import {headerAtom} from "../../store/atom/header";
import Styles from "./Styles";
import Header from "./Header";

const Index = () => {

  return <Styles.DefaultLayoutWrap>
    <Header />
    <Styles.Content>
      <Outlet/>
    </Styles.Content>
  </Styles.DefaultLayoutWrap>
}

export default Index
