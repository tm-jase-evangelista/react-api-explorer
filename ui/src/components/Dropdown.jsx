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
        <div className="label">{data.name}</div>
        {isToggled ? (
          <img
            src={process.env.PUBLIC_URL + "/dropdown/arrow-up.png"}
            alt="Arrow Up"
            width="5%"
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/dropdown/arrow-down.png"}
            alt="Arrow Down"
            width="5%"
          />
        )}
      </div>
      {isToggled && (
        <div>
          {data &&
            apiList.map((api) => {
              const logo = data.apis[api].info["x-logo"].url;
              const title = data.apis[api].info.title;
              return (
                <Link
                  key={title}
                  to={`/details/${data.name}/${api}`}
                  className="row row-redirect"
                >
                  <img src={logo} width="5%" />
                  <div className="label">{title}</div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};
