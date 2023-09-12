import { MainPage } from "./components/MainPage";
import { ServicePage } from "./components/ServicePage";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./utils/DataContext";
import "./styles/App.css";
import { NavbarProvider } from "./utils/NavbarContext";

const App = () => {
  return (
    <div className="app">
      <DataProvider>
        <NavbarProvider>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route
              exact
              path="/details/:provider/:service"
              element={<ServicePage />}
            />
          </Routes>
        </NavbarProvider>
      </DataProvider>
    </div>
  );
};

export default App;
