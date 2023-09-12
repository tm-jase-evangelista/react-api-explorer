import "../styles/components/Navbar.css";

export const Navbar = ({ children }) => {
  return (
    <div className="navbar">
      <h1>Select Provider</h1>
      <div>{children}</div>
    </div>
  );
};
