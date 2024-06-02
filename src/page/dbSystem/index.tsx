import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Index = () => {
  const List = lazy(() => import("./List"));

  return (
    <>
      <Suspense>
        <Routes>
          <Route path={"/list"} element={<List />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Index;
