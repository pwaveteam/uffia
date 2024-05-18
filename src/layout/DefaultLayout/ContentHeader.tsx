import Styles from "./Styles";
import {useRecoilValue} from "recoil";
import {headerAtom} from "../../store/atom/header";

const ContentHeader = () => {

  const header = useRecoilValue(headerAtom)

  return <Styles.ContentHeader>
    {header.title} {header.nowStep > 0 && <p>{header.nowStep}/{header.maxStep}</p>}
  </Styles.ContentHeader>
}

export default ContentHeader
