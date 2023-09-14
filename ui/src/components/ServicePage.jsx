import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";

import "../styles/components/ServicePage.css";
import { useNavbarContext } from "../contexts/NavbarContext";
import { API_GURU_BASE_URL } from "../utils/constants";

export const ServicePage = () => {
  const { provider, service } = useParams();
  const { data, loading } = useDataContext();
  const { setNavbarToggle } = useNavbarContext();

  const [serviceData, setServiceData] = useState(null);
  const [infoList, setInfoList] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);

  const iterateThroughObject = (obj) => {
    const keyValuePairs = [];
    Object.entries(obj).forEach(([key, value]) => {
      keyValuePairs.push({
        key: key,
        value: value,
      });
    });
    return keyValuePairs;
  };

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

  return (
    <>
      {!serviceData && noDataFound && (
        <div className="display-msg-service">Invalid URL! No data found</div>
      )}
      {serviceData && serviceData.info && (
        <div className="main-service">
          <header>
            <img src={serviceData.info["x-logo"].url} />
            <h1>{serviceData.info.title}</h1>
          </header>
          <div className="content">
            {serviceData.info.description && (
              <div className="content-entry">
                <h2>Description</h2>
                <p>{serviceData.info.description}</p>
              </div>
            )}
            {serviceData.swaggerUrl && (
              <div className="content-entry">
                <h2>Swagger</h2>
                <p>{serviceData.swaggerUrl}</p>
              </div>
            )}
            {infoList && (
              <div className="content-entry">
                <h2>Contact</h2>
                <table className="table-contact">
                  <tbody>
                    {infoList.map((info) => {
                      return (
                        <tr key={info.key} className="contact-entry">
                          <td>{info.key}</td>
                          <td>{info.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Link to="/" className="link" onClick={() => setNavbarToggle(true)}>
            <button className="btn-primary">Explore more APIs</button>
          </Link>
        </div>
      )}
    </>
  );
};
