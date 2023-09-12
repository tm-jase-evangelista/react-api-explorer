import "../styles/components/Dropdown.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Dropdown = ({ data }) => {
  const [isToggled, setToggle] = useState(false);
  const apiList = Object.keys(data.apis);

  const handleToggle = () => {
    setToggle(!isToggled);
  };

  return (
    <div className={`dropdown ${isToggled ? "toggled" : ""}`}>
      <div className="row row-toggle" onClick={handleToggle}>
        <div className="label label-provider">{data.name}</div>
        {isToggled ? (
          <img
            src={process.env.PUBLIC_URL + "/dropdown/arrow-up.png"}
            alt="Arrow Up"
            width="3%"
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/dropdown/arrow-down.png"}
            alt="Arrow Down"
            width="3%"
          />
        )}
      </div>
      {isToggled && (
        <div>
          {data &&
            apiList.map((api) => {
              return (
                <Link
                  key={`${data.name}-${api}`}
                  to={`/details/${data.name}/${api}`}
                  className="row row-redirect"
                >
                  <img
                    className="logo"
                    src={data.apis[api].info["x-logo"].url}
                    width="7.5%"
                  />
                  <div className="label label-service">
                    {data.apis[api].info.title}
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};
