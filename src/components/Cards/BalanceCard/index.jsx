import React from "react";

import styles from "./balanceCard.module.css";

const BalanceCard = ({ Icon, headText, amount, type }) => {
  return (
    <div
      className={`${styles["container"]} ${
        styles[`card-${type}`]
      }  flex items-start py-3`}
    >
      <div className={`py-2 px-3 gap-3`}>{Icon ? <Icon /> : ""}</div>
      <div className="flex flex-col justify-center h-full">
        <p>{headText}</p>
        <p>{amount}</p>
      </div>
    </div>
  );
};

export { BalanceCard };
