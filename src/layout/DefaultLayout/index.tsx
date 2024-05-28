import {Outlet} from "react-router-dom"
import {useRecoilValue} from "recoil";
import {headerAtom} from "../../store/atom/header";
import Styles from "./Styles";
import ContentHeader from "./ContentHeader";
import Header from "./Header";
import Button from "../../module/button";

const Index = () => {

  return <Styles.DefaultLayoutWrap>
    <Header />
    <Styles.ButtonWrap>
      <Button bgColor={'red'} text={'영업사원과 문의 잡기'} width={'71%'}/>
    </Styles.ButtonWrap>

    <Styles.ContentWrap>
      <Styles.Content>
        <ContentHeader/>
        <Outlet/>
      </Styles.Content>
    </Styles.ContentWrap>
  </Styles.DefaultLayoutWrap>
}

export default Index
