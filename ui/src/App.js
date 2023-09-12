import { MainPage } from "./components/MainPage";
import { ServicePage } from "./components/ServicePage";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./utils/DataContext";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app">
      <DataProvider>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route
            exact
            path="/details/:provider/:service"
            element={<ServicePage />}
          />
        </Routes>
      </DataProvider>
    </div>
  );
};

export default App;
