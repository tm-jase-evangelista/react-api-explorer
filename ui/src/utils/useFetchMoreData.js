import { useDataContext } from "../contexts/DataContext";
import { fetchProviderInfo } from "./helpers";
import { ITEMS_PER_PAGE } from "./constants";

export const useFetchMoreData = () => {
  const { data, setData, listProvider, pageNum, setPageNum } = useDataContext();

  const getNewProviders = (pageNum, listProvider) => {
    const indexStart = pageNum * ITEMS_PER_PAGE;
    const indexEnd = indexStart + ITEMS_PER_PAGE;
    return listProvider.slice(indexStart, indexEnd);
  };

  const fetchMoreData = () => {
    const newProviders = getNewProviders(pageNum, listProvider);
    const promises = newProviders.map((entry) => fetchProviderInfo(entry));
    Promise.all(promises)
      .then((res) => {
        const newData = res.map((item) => ({
          name: item.config.api_name,
          apis: item.data.apis,
        }));
        const updatedData = data.concat(newData);
        setData(updatedData);
        setPageNum(pageNum + 1);
      })
      .catch((error) => {
        console.error("Error fetching provider info:", error);
      });
  };
  return { fetchMoreData };
};
