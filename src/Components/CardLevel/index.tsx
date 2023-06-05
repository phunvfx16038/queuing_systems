import React, { ReactNode } from "react";

import "./cardlevel.css";

type cardProp = {
  icon1: ReactNode;
  title: string;
  value: string | number;
  icon2: ReactNode;
  percent: string | number;
  [key: string]: any;
  type: string;
};

const CardLevel = ({
  icon1,
  icon2,
  title,
  value,
  percent,
  type,
  ...prop
}: cardProp) => {
  return (
    <div className="cardlevel">
      <div className="order-number">
        <span
          className={`wrap-icon ${
            type === "blue"
              ? "blue"
              : type === "green"
              ? "green"
              : type === "orange"
              ? "orange"
              : "red"
          }`}
          {...prop}
        >
          {icon1}
        </span>
        <p className="order-text">{title}</p>
      </div>
      <div className="order-value">
        <div className="value">{value}</div>
        <div>
          <span className="order-percent">
            {icon2}
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardLevel;
