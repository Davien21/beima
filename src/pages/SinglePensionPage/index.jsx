import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { barchartImage } from "../../assets/images";
import { PensionSvg, TotalBalSvg, TotalSvg } from "../../assets/svg";
import { BalanceCard, Button, Prompt } from "../../components";
import BackButton from "../../components/BackButton";
import { useDashboardContext } from "../../contexts/dashboardContext";
import {
  depositAsset,
  supplyAssets,
  withdrawAssets,
} from "../../services/pensionService";
import { formatMoney } from "../../utils";
import styles from "./single-pension-page.module.css";

const getInterest = (interest) => {
  if (interest.currency === "$")
    return `${interest.currency}${interest.amount}`;

  return `${interest.amount} ${interest.currency}`;
};

function SinglePensionPage(props) {
  const [activePrompt, setActivePrompt] = useState(false);
  const { pensions, updatePensionPlan } = useDashboardContext();
  const { id } = useParams();
  const details = pensions?.[id - 1];

  const handleDeposit = () => {
    (async () => {
      const onSuccess = () => {
        const currentState = { ...details };
        currentState.totalDeposit =
          currentState.totalDeposit + currentState.monthlyDeposit;
        currentState.totalUnsuppliedAmount = currentState.totalDeposit;
        updatePensionPlan(id, currentState);
        // console.log(details, currentState);
      };
      await depositAsset(onSuccess);
    })();
  };

  const handleSupply = () => {
    (async () => {
      const onSuccess = () => {
        const currentState = { ...details };
        currentState.totalUnsuppliedAmount = 0;
        updatePensionPlan(id, currentState);
      };
      await supplyAssets(details.totalUnsuppliedAmount, onSuccess);
    })();
  };

  const handleWithdraw = () => {
    (async () => {
      const deposit = details.totalDeposit;
      const onSuccess = () => {
        const currentState = { ...details };
        currentState.totalUnsuppliedAmount = 0;
        currentState.totalDeposit = 0;
        console.log(currentState);
        updatePensionPlan(id, currentState);
        setActivePrompt(false);
      };
      await withdrawAssets(deposit, onSuccess);
    })();
  };

  return (
    <main className={`${styles["container"]} container pb-20`}>
      <Prompt
        isActive={activePrompt}
        setIsActive={setActivePrompt}
        onWithdraw={handleWithdraw}
      />
      <BackButton to="/dashboard/pensions" />
      {pensions.length > 0 && (
        <div className={` py-4`}>
          <div
            className={`grid grid-rows-2 grid-cols-11 gap-4 lg:gap-0 p-4 items-center ${styles["card-body"]} mb-6`}
          >
            <div
              className={`col-span-2 xl:col-span-1 sm:row-span-2 ${styles["img-div"]} xl:pr-4`}
            >
              <img src={barchartImage} alt="" />
            </div>
            <div className="flex flex-col justify-center col-span-9 sm:col-span-5 lg:col-span-6 xl:col-span-7 sm:row-span-2">
              <div>
                <span>{details.name} Plan</span>
              </div>
              <div className="">
                <span className="pr-3 mb-1">Interest: </span>
                <span className={`${styles["detail"]} mb-1`}>
                  {getInterest(details.interest)}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center col-span-11 sm:col-span-4 lg:col-span-3 sm:row-span-2">
              <Button
                className="col-span-3"
                text="Deposit"
                onClick={() => handleDeposit()}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-6">
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <BalanceCard
                type="totalBal"
                headText="Total Deposit"
                amount={`${formatMoney(details.totalDeposit)}`}
                Icon={TotalBalSvg}
              />
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <BalanceCard
                type="outline"
                headText="Monthly Deposit"
                amount={`${formatMoney(details.monthlyDeposit)}`}
                Icon={PensionSvg}
              />
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <BalanceCard
                type="outline"
                headText="Total interest"
                amount={`${getInterest(details.interest)}`}
                Icon={TotalSvg}
              />
            </div>
          </div>
          <div
            className={`${styles["card-body"]} text-center sm:text-left px-10 py-8 mb-10`}
          >
            <div className="mb-4">
              <span className="pr-2">You currently have </span>
              <span className={`${styles["detail"]} pr-2`}>
                {formatMoney(details.totalUnsuppliedAmount)}
              </span>
              <span> available to stake for interests.</span>
              <br />
            </div>
            <div
              className={`${styles["special-btns"]} flex flex-wrap gap-y-4 gap-x-10`}
            >
              <Button
                disabled={parseInt(details.totalUnsuppliedAmount) <= 0}
                className="col-span-3"
                text="Stake Funds"
                onClick={() => handleSupply()}
              />
              <Button
                className="col-span-3"
                text="Withdraw"
                onClick={() => setActivePrompt(true)}
              />
            </div>
          </div>

          <div className={`${styles["card-body"]} px-10 pt-10 pb-10`}>
            <div className="mb-2">
              <span className="pr-3">Your Pension plan was created on</span>
              <span className={`${styles["detail"]}`}>
                {details.dateCreated}
              </span>
            </div>
            <div className="mb-2">
              <span className="pr-3">You are eligible to withdraw it on</span>
              <span className={`${styles["detail"]}`}>
                {details.maturityDate}.
              </span>
            </div>
            <div className="mb-2"></div>
            <div>Other Information:</div>
          </div>
        </div>
      )}
    </main>
  );
}

export { SinglePensionPage };
