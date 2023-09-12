import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// TODO: move to a .env
const API_PROVIDER_BASE_URL = "https://api.apis.guru/v2";

export const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProviderInfo = useCallback((entries) => {
    const promises = entries.map((entry) => fetchProviderInfo(entry));
    Promise.all(promises)
      .then((res) => {
        const data = res.map((item) => ({
          name: item.config.api_name,
          apis: item.data.apis,
        }));
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching provider info:", error);
      });
  }, []);

  const fetchProviderInfo = (name) => {
    const url = `${API_PROVIDER_BASE_URL}/${name}.json`;
    const config = { api_name: name };
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const fetchData = useCallback(() => {
    axios
      .get(`${API_PROVIDER_BASE_URL}/providers.json`)
      .then((res) => {
        const data = res.data.data;
        const slicedData = data.slice(0, 50);
        fetchAllProviderInfo(slicedData);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [fetchAllProviderInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
