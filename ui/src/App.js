import { MainPage } from "./components/MainPage";
import { useFetch } from "./utils/useFetch";
import './styles/App.css';

const API_PROVIDER_BASE_URL = "https://api.apis.guru/v2";

const App = () => {
  const { data, loading, error} = useFetch(`${API_PROVIDER_BASE_URL}/adobe.com.json`);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.toString()}</div>
  }

  return (
    <div className="app">
      <MainPage />
    </div>
  );
}

export default App;
