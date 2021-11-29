import React from "react";
import { BalanceCard } from "../../components/Cards/BalanceCard";
import styles from "./dashboard-home.module.css";
import {
  TotalBalSvg,
  PensionSvg,
  TotalSvg,
  pensionDueSvg,
} from "../../assets/svg";
import {
  lockImage,
  barchartImage,
  cubeImage,
  piechartImage,
} from "../../assets/images";
import { PensionsCard } from "../../components/Cards/PensionsCard";

function DashboardHome() {
  return (
    <main className={`${styles["container"]} container  py-5`}>
      <div className={`py-5`}>
        <h1 className={styles.pageText + " text-white mb-8"}>Dashboard</h1>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-3 xl:col-span-2">
            <BalanceCard
              type="totalBal"
              headText="Total balance"
              amount="$131,810.16"
              Icon={TotalBalSvg}
            />
          </div>
          <div className="col-span-6 md:col-span-3 xl:col-span-2">
            <BalanceCard
              type="outline"
              headText="Pension balance"
              amount="$84,605.74"
              Icon={PensionSvg}
            />
          </div>
          <div className="col-span-6 md:col-span-3 xl:col-span-2">
            <BalanceCard
              type="outline"
              headText="Total interest"
              amount="$84,605.74"
              Icon={TotalSvg}
            />
          </div>
        </div>
      </div>
      <div className={` py-14`}>
        <h4 className="text-white mb-5">Pension plans</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard
              Icon={lockImage}
              text="Retirement plan"
              alt="retirement"
            />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard Icon={cubeImage} text="10yrs plan" alt="10yrs" />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard Icon={piechartImage} text="3yrs plan" alt="3yrs" />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard
              Icon={barchartImage}
              text="Flexible time plan"
              alt="lexible"
            />
          </div>
        </div>
      </div>
      <div className={styles.viewArea + " grid grid-cols-3 gap-4  py-5"}>
        <div className={styles.plannerCard + " col-span-3 lg:col-span-2"}></div>
        <div
          className={
            styles.dueCard + " col-span-3 lg:col-span-1 flex flex-col p-5"
          }
        >
          <img src={pensionDueSvg} alt="pension_due" />
          <h5>Pension Due</h5>
          <p className="my-3">
            Your closest accured pension will be due in <span>3yrs</span>
          </p>
          <button className="ml-auto">View</button>
        </div>
      </div>
    </main>
  );
}

export { DashboardHome };
