import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Index = () => {
  const AiContent = lazy(() => import("./aiContent"));
  const AiDesign = lazy(() => import("./aiDesign"));

  return (
    <>
      <Suspense>
        <Routes>
          <Route path={"/ai-content"} element={<AiContent />} />
          <Route path={"/ai-design"} element={<AiDesign />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Index;
