import { Link, useParams } from "react-router-dom";

import "../styles/components/ServicePage.css";
import { useNavbarContext } from "../contexts/NavbarContext";
import { useFetchServiceData } from "../utils/useFetchServiceData";

export const ServicePage = () => {
  const { provider, service } = useParams();
  const { setNavbarToggle } = useNavbarContext();
  const { serviceData, infoList, noDataFound } = useFetchServiceData(
    provider,
    service,
  );

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
