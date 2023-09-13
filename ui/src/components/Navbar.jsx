import "../styles/components/Navbar.css";
import { useFetchMoreData } from "../utils/useFetchMoreData";

export const Navbar = ({ children }) => {
  const { fetchMoreData } = useFetchMoreData();
  return (
    <div className="navbar">
      <h1>Select Provider</h1>
      <div>{children}</div>
      <button onClick={() => fetchMoreData()}>More</button>
    </div>
  );
};
