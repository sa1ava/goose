import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const _root = document.getElementById("root") as HTMLElement;
createRoot(_root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
