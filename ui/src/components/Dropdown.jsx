import '../styles/components/Dropdown.css';
import { useState } from "react"

export const Dropdown = () => {
  const [isToggled, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!isToggled);
  }

  return (
    <div className={`dropdown ${isToggled ? "toggled": ""}`}>
      <div
        className="row row-toggle"
        onClick={handleToggle}
      >
        <div className="label">API Name</div>
        {isToggled ? (<div>Arrow-Up</div>) : (<div>Arrow-Down</div>)}
      </div>
      {isToggled && (
      <div className="row row-redirect">
        <div>Logo</div>
        <div className="label">Title</div>
      </div>
      )}
    </div>
  )
}