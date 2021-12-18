import React from "react";
import { BalanceCard } from "../../components/Cards/BalanceCard";
import styles from "./dashboard-home.module.css";

import {
  TotalBalSvg,
  PensionSvg,
  TotalSvg,
  pensionDueSvg,
} from "../../assets/svg";

import { useDashboardContext } from "../../contexts/dashboardContext";
import { PensionPlans } from "../../layouts/DashLayout/components/PensionPlans";
import { ProfileSetupForm } from "../../components";
import { Link } from "react-router-dom";
import { formatMoney } from "../../utils";

const getInterest = (interest) => {
  if (interest?.currency === "$")
    return `${interest?.currency}${interest?.amount}`;

  return `${interest?.amount} ${interest?.currency}`;
};

const nullInterest = { amount: 0, currency: "XEND" };

function DashboardHome() {
  const { isRegistered, pensions } = useDashboardContext();

  return (
    <main className={`${styles["container"]} container  pb-5`}>
      {!isRegistered && <ProfileSetupForm />}
      <div className={`pb-5`}>
        <h1 className={styles.pageText + " text-white mb-8"}>Dashboard</h1>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-3 xl:col-span-2">
            <BalanceCard
              type="totalBal"
              headText="Total balance"
              amount={formatMoney(pensions[0]?.totalDeposit || 0)}
              Icon={TotalBalSvg}
            />
          </div>
          <div className="col-span-6 md:col-span-3 xl:col-span-2">
            <BalanceCard
              type="outline"
              headText="Pension balance"
              amount={formatMoney(pensions[0]?.totalDeposit || 0)}
              Icon={PensionSvg}
            />
          </div>
          <div className="col-span-6 md:col-span-3 xl:col-span-2">
            <BalanceCard
              type="outline"
              headText="Total interest"
              amount={getInterest(pensions[0]?.interest || nullInterest)}
              Icon={TotalSvg}
            />
          </div>
        </div>
      </div>
      <div className={` py-14`}>
        <h4 className="text-white mb-5">Pension plans</h4>
        <PensionPlans />
      </div>
      <div className={styles.viewArea + " grid grid-cols-3 gap-4  py-5"}>
        <div className={styles.plannerCard + " col-span-3 lg:col-span-2"}></div>
        <div
          className={
            styles.dueCard + " col-span-3 lg:col-span-1 flex flex-col p-5"
          }
        >
          <img src={pensionDueSvg} alt="" />
          <h5>Pension Due</h5>
          <p className="mt-3 mb-5">
            Your closest accured pension will be due by{" "}
            <span>{pensions[0]?.maturityDate}</span>
          </p>
          <div className="flex justify-stretch xl:justify-end ">
            <Link to="/dashboard/pensions">View</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export { DashboardHome };
