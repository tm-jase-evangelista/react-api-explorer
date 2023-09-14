import { MainPage } from "./components/MainPage";
import { ServicePage } from "./components/ServicePage";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { NavbarProvider } from "./contexts/NavbarContext";

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
