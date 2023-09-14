import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDataContext } from "../contexts/DataContext";
import { API_GURU_BASE_URL } from "./constants";
import { iterateThroughObject } from "./helpers";

export const useFetchServiceData = (provider, service) => {
  const { data, loading } = useDataContext();

  const [serviceData, setServiceData] = useState(null);
  const [infoList, setInfoList] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);

  const setPageData = useCallback((service, apiMap) => {
    if (service in apiMap) {
      const serviceData = apiMap[service];
      setServiceData(serviceData);
      if ("contact" in serviceData.info) {
        const infoList = iterateThroughObject(serviceData.info.contact);
        setInfoList(infoList);
      }
    } else {
      setNoDataFound(true);
    }
  }, []);

  useEffect(() => {
    if (!loading && data) {
      let providerData = null;
      data.forEach((datum) => {
        if (datum.name === provider) {
          providerData = datum;
          return;
        }
      });
      if (providerData) {
        setPageData(service, providerData.apis);
      } else {
        axios
          .get(`${API_GURU_BASE_URL}/${provider}.json`)
          .then((res) => {
            setPageData(service, res.data.apis);
          })
          .catch((error) => {
            setNoDataFound(true);
            console.error(error);
          });
      }
    }
  }, [data, loading, provider, service, setPageData]);

  return { serviceData, infoList, noDataFound };
};
