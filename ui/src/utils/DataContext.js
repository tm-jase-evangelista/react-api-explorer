import { createContext, useContext } from "react";
import { useFetchData } from "./useFetchData";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { data, setData, loading, error, listProvider, pageNum, setPageNum } =
    useFetchData();

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        listProvider,
        pageNum,
        setPageNum,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
