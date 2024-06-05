import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Index = () => {
  const AiContent = lazy(() => import("./aiContent"));

  return (
    <>
      <Suspense>
        <Routes>
          <Route path={"/ai-content"} element={<AiContent />} />
          <Route path={"/ai-design"} element={<div>디자인 페이지</div>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Index;
