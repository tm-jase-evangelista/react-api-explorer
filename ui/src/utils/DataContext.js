import { createContext, useContext } from "react";
import { useFetchData } from "./useFetchData";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { data, loading, error } = useFetchData();
  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
