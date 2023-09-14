import axios from "axios";
import { API_GURU_BASE_URL } from "./constants";

export const fetchProviderInfo = (name) => {
  const url = `${API_GURU_BASE_URL}/${name}.json`;
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

export const iterateThroughObject = (obj) => {
  const keyValuePairs = [];
  Object.entries(obj).forEach(([key, value]) => {
    keyValuePairs.push({
      key: key,
      value: value,
    });
  });
  return keyValuePairs;
};
