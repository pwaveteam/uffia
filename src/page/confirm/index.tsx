import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Styles from "../regis/Styles";

const Index = () => {

  const ConfirmSurvey = lazy(() => import('./page/ConfirmSurvey'))

  return <Styles.Wrap>
    <Suspense fallback={'/'}>
      <Routes>
        <Route path={':seq'} element={<ConfirmSurvey />} />
      </Routes>
    </Suspense>
  </Styles.Wrap>
}

export default Index
