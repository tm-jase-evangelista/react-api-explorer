import '../styles/components/MainPage.css';
import '../styles/global.css';
import { useState } from "react";
import { Navbar } from './Navbar';
import { useFetchProviders } from "../utils/useFetchProviders";

export const MainPage = () => {
  const { data, loading, error} = useFetchProviders();

  const [isNavbarToggled, setNavbarToggle] = useState(false);

  const handleOnClick = () => {
    console.log("button clicked!");
    setNavbarToggle(!isNavbarToggled);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.toString()}</div>
  }

  return (
    <div className="main-page">
      {isNavbarToggled && <Navbar/>}
      <button
        className='btn-primary'
        onClick={handleOnClick}>Explore web APIs</button>
    </div>
  )
}