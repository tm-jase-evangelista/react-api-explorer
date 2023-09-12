import { MainPage } from "./components/MainPage";
import { ServicePage } from "./components/ServicePage";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route
          exact
          path="/details/:provider/:service"
          element={<ServicePage />}
        />
      </Routes>
    </div>
  );
};

export default App;
