import axios from "axios";

const API_PROVIDER_BASE_URL = "https://api.apis.guru/v2";

export const fetchProviderInfo = (name) => {
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

export const fetchAllProviderInfo = (entries, setData, setLoading) => {
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
};
