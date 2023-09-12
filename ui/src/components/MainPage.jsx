import '../styles/components/MainPage.css';
import '../styles/global.css';
import { useState } from "react";
import { Navbar } from './Navbar';
import { useFetchProviders } from "../utils/useFetchProviders";
import { Dropdown } from './Dropdown';

export const MainPage = () => {
  const { data, loading, error} = useFetchProviders();

  const [isNavbarToggled, setNavbarToggle] = useState(false);

  const handleOnClick = () => {
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
      {isNavbarToggled &&
        <>
          <div className='overlay' onClick={handleOnClick}/>
          <Navbar>
            <div>
            {data && data.map((apiData) => {
              return (
                <Dropdown
                  key={apiData.name}
                  data={apiData}
                />
              )
            })}
            </div>
          </Navbar>
        </>
      }
      <button
        className='btn-primary'
        onClick={handleOnClick}>Explore web APIs</button>
    </div>
  )
}