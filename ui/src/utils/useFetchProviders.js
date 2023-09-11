import { useEffect, useState } from "react";
import axios from "axios";

// TODO: move to a .env
const API_PROVIDER_BASE_URL = "https://api.apis.guru/v2";

export const useFetchProviders = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios.get(`${API_PROVIDER_BASE_URL}/providers.json`).then((res) => {
      const data = res.data.data;
      // slice data
      const slicedData = data.slice(0, 50);
      fetchAllProviderInfo(slicedData)
    }).catch((error) => {
      console.error(error);
      setError(error);
    })
  }

  const fetchProviderInfo = (name) => {
    const url = `${API_PROVIDER_BASE_URL}/${name}.json`;
    const config = {api_name: name}
    return new Promise((resolve, reject) => {
      axios.get(url, config).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  const fetchAllProviderInfo = (entries) => {
    const promises = entries.map((entry) => fetchProviderInfo(entry));
    Promise.all(promises)
    .then((res) => {
      const data = res.map((item) => ({
        name: item.config.api_name,
        apis: item.data.apis
      }));
      console.log(data);
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching provider info:', error);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}
