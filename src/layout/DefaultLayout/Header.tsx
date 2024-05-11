import Styles from "./Styles";
import {useRecoilValue} from "recoil";
import {headerAtom} from "../../store/atom/header";

const Header = () => {

  const header = useRecoilValue(headerAtom)

  return <Styles.Header>
    {header.title} {header.nowStep > 0 && <p>{header.nowStep}/{header.maxStep}</p>}
  </Styles.Header>
}

export default Header
