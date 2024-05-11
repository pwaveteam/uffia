import {lazy, Suspense} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom'
import Styles from "./Styles";

const Index = () => {

  const Step = lazy(() => import('./step'))

  return <Styles.Wrap>
    <Suspense fallback={'/'}>
      <Routes>
        <Route path={':seq'} element={<Step />} />
      </Routes>
    </Suspense>
    </Styles.Wrap>
}

export default Index
