import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { fetchAllProviderInfo } from "./helpers";
import { API_GURU_BASE_URL, ITEMS_PER_PAGE } from "./constants";

export const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listProvider, setListProvider] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const fetchData = useCallback(() => {
    axios
      .get(`${API_GURU_BASE_URL}/providers.json`)
      .then((res) => {
        const data = res.data.data;
        setListProvider(data);
        const slicedData = data.slice(0, ITEMS_PER_PAGE);
        fetchAllProviderInfo(slicedData, setData, setLoading);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    loading,
    error,
    listProvider,
    pageNum,
    setPageNum,
  };
};
