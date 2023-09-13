import { useDataContext } from "../contexts/DataContext";
import "../styles/components/Navbar.css";
import { useFetchMoreData } from "../utils/useFetchMoreData";

export const Navbar = ({ children }) => {
  const { data, listProvider } = useDataContext();
  const { fetchMoreData } = useFetchMoreData();
  return (
    <div className="navbar">
      <h1>Select Provider</h1>
      <div>{children}</div>
      {data && listProvider && data.length !== listProvider.length && (
        <button
          className="btn-primary btn-load-providers"
          onClick={() => fetchMoreData()}
        >
          Load More Providers
        </button>
      )}
    </div>
  );
};
