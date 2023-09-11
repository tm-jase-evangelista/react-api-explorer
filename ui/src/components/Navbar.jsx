import { Dropdown } from "./Dropdown"
import '../styles/components/Navbar.css';

export const Navbar = () => {

  return (
    <div className="navbar">
      <h1>Select Provider</h1>
      {/* map list of data to dropdown component */}
      <Dropdown />
      <Dropdown />
    </div>
  )
}