import '../styles/components/MainPage.css';
import '../styles/global.css';
export const MainPage = () => {

  const handleOnClick = () => {
    console.log("button clicked!");
  }

  return (
    <div className="main-page">
      <button
        className='btn-primary'
        onClick={handleOnClick}>Explore web APIs</button>
    </div>
  )
}