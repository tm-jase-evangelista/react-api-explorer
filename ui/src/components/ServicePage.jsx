import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../styles/components/ServicePage.css';

export const ServicePage = () => {

  const { provider, service } = useParams();

  const [serviceData, setServiceData] = useState(null);
  const [infoList, setInfoList] = useState(null);

  const iterateThroughObject = (obj) => {
    const keyValuePairs = [];
    Object.entries(obj).forEach(([key, value]) => {
      keyValuePairs.push({
        key: key,
        value: value,
      })
    })
    return keyValuePairs;
  }

  useEffect(() => {
    axios.get(`https://api.apis.guru/v2/${provider}.json`).then((res) => {
      const apis = res.data.apis;
      if (service in apis){
        const serviceData = apis[service];
        setServiceData(serviceData);
        if ("contact" in serviceData.info){
          const infoList = iterateThroughObject(serviceData.info.contact)
          setInfoList(infoList);
        }
      }
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  return (
    <>
      {serviceData && serviceData.info && (
        <div className='main-service'>
          <header>
            <img src={serviceData.info["x-logo"].url}/>
            <h1>{serviceData.info.title}</h1>
          </header>
          <div className='content'>
            {serviceData.info.description && (
              <div className='content-entry'>
                <h2>Description</h2>
                <p>{serviceData.info.description}</p>
              </div>
            )}
            {serviceData.swaggerUrl && (
              <div className='content-entry'>
                <h2>Swagger</h2>
                <p>{serviceData.swaggerUrl}</p>
              </div>
            )}
            {infoList && (
              <div className='content-entry'>
                <h2>Contact</h2>
                <table className='table-contact'>
                  {infoList.map((info) => {
                    return (
                      <tr key={info.key} className="contact-entry">
                        <td>{info.key}</td>
                        <td>{info.value}</td>
                      </tr>
                    )
                  })}
                </table>
              </div>
            )}
          </div>
          <Link to="/" className='link'>
            <button className='btn-primary'>
              Explore more APIs
            </button>
          </Link>
        </div>
      )}
    </>
  )
}