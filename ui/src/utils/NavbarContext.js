import { createContext, useContext, useState } from "react";

export const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
  const [navbarToggle, setNavbarToggle] = useState(false);
  return (
    <NavbarContext.Provider value={{ navbarToggle, setNavbarToggle }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
