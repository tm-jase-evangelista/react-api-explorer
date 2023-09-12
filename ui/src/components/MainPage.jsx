import "../styles/components/MainPage.css";
import "../styles/global.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Dropdown } from "./Dropdown";
import { useDataContext } from "../utils/DataContext";
import { useNavbarContext } from "../utils/NavbarContext";

export const MainPage = () => {
  const { data, loading, error } = useDataContext();
  const { navbarToggle } = useNavbarContext();
  const [isNavbarToggled, setNavbarToggle] = useState(navbarToggle);

  const handleOnClick = () => {
    setNavbarToggle(!isNavbarToggled);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div className="main-page">
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
    </div>
  );
};
