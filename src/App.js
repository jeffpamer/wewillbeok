import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import TestDrawing from "./TestDrawing";

const App = () => (
  <div>
    <LoadingIndicator text="we will be ok" />
    <TestDrawing />
  </div>
);

export default App;
