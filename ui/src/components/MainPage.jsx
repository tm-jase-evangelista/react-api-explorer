import "../styles/components/MainPage.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Dropdown } from "./Dropdown";
import { useDataContext } from "../contexts/DataContext";
import { useNavbarContext } from "../contexts/NavbarContext";

export const MainPage = () => {
  const { data, loading, error } = useDataContext();
  const { navbarToggle } = useNavbarContext();
  const [isNavbarToggled, setNavbarToggle] = useState(navbarToggle);

  const handleOnClick = () => {
    setNavbarToggle(!isNavbarToggled);
  };

  return (
    <div className="main-page">
      {loading && <div className="display-msg">Loading...</div>}
      {error && <div className="display-msg">{error.toString()}</div>}
      {!loading && !error && data && (
        <>
          {isNavbarToggled && (
            <>
              <div className="overlay" onClick={handleOnClick} />
              <Navbar>
                <div>
                  {data &&
                    data.map((apiData) => {
                      return <Dropdown key={apiData.name} data={apiData} />;
                    })}
                </div>
              </Navbar>
            </>
          )}
          <button className="btn-primary" onClick={handleOnClick}>
            Explore web APIs
          </button>
        </>
      )}
    </div>
  );
};
