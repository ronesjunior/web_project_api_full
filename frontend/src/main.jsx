import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

// Renderização da aplicaçao React dentro da div root

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/*componente pai App.jsx da aplicação que englobará todos os outros filhos (Header.jsx, Main.jsx, Footer.jsx) */}
    </BrowserRouter>
  </StrictMode>,
);
