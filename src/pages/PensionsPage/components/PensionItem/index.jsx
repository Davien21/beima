import React from "react";
import { barchartImage } from "../../../../assets/images";
import styles from "./pension-item.module.css";
import { Link } from "react-router-dom";

const getInterest = (interest) => {
  if (interest.currency === "$")
    return `${interest.currency}${interest.amount}`;

  return `${interest.amount} ${interest.currency}`;
};

function PensionItem({ details }) {
  return (
    <Link to={`/dashboard/pensions/${details.ipfsHash}`}>
      <div className={`${styles["container"]}`}>
        <div className="flex flex-wrap sm:flex-nowrap justify-center px-0 py-8 md:py-10 gap-x-5 items-end">
          <div className={`mb-4 md:mb-0 ${styles["chart-img-div"]}`}>
            <img src={barchartImage} alt="" />
          </div>
          <div className="w-full">
            <div className="flex flex-wrap justify-between mb-6">
              <div className="text-2xl">{details.name} Plan</div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div>
                <span className="pr-3 mb-1 font-light">
                  Percentage Returns:
                </span>
                <span className={`${styles["detail"]} mb-1`}>
                  {details.percentageReturn}%
                </span>
              </div>
              <div className="">
                <span className="pr-3 mb-1">Interest: </span>
                <span className={`${styles["detail"]} mb-1`}>
                  {getInterest(details.interest)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div>
                <span className="pr-3 mb-1 font-light">Date Created:</span>
                <span className={`${styles["detail"]} mb-1`}>
                  {details.dateCreated}
                </span>
              </div>
              <div className="">
                <span className="pr-3 mb-1 font-light">Maturity Date:</span>
                <span className={`${styles["detail"]} mb-1`}>
                  {details.maturityDate}
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Link>
  );
}

export default PensionItem;
