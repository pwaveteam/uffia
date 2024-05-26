import React from 'react';
import Route from "./route";
import {useRecoilValue} from "recoil";
import {alertAtom} from "./store/atom/alert";
import Alert from "./module/alert";

function App() {

  const alert = useRecoilValue(alertAtom)

  return <>
    <Route />
    {
      alert.isShow && <Alert content={alert.content} />
    }
    </>;
}

export default App;

