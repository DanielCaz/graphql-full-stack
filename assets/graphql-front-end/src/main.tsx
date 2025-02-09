import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { Amplify } from "aws-amplify";
// @ts-expect-error Missing type definitions for aws-exports
import config from "../aws-exports";

Amplify.configure(config);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
