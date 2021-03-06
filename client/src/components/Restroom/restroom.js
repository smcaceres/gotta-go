import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWheelchair,
  faBaby,
  faTransgenderAlt,
} from "@fortawesome/free-solid-svg-icons";

const Restroom = ({ props }) => {
  const { id, name, street, city, state, accessible, unisex, changing_table } =
    props;
  return (
    <Link to={`restroom/${name}`}>
      <div className="card">
        <div className="card-title">
          {name} {accessible ? <FontAwesomeIcon icon={faWheelchair} /> : null}{" "}
          {changing_table ? <FontAwesomeIcon icon={faBaby} /> : null}{" "}
          {unisex ? <FontAwesomeIcon icon={faTransgenderAlt} /> : null}
        </div>
        <div>
          {street}
          <br />
          {city}, {state}
        </div>
      </div>
    </Link>
  );
};

export default Restroom;
