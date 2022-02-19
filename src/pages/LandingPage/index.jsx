import React from "react";
import { mapImage, peopleImage } from "../../assets/images";

import {
  airbnbLogo,
  apySvg,
  chainSvg,
  CircleLoader,
  DottedLineSvg,
  googleLogo,
  houseSvg,
  hubspotLogo,
  microsoftLogo,
  personSvg,
  securitySvg,
  trophySvg,
  YellowCrosses,
} from "../../assets/svg";

import { ConnectButton } from "../../components";
import styles from "./landing-page.module.css";

function LandingPage(props) {
  const currentYear = new Date().getFullYear();
  return (
    <main className={`${styles.container}`}>
      <section
        className={`${styles.section_1} flex flex-col items-center justify-center`}
      >
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6 2xl:col-span-5 lg:mb-16  mt-5 pt-12">
              <div className={`${styles.banner_text} text-white mb-10`}>
                <span>A retirement </span>
                <div className={`${styles.solution_text} inline-block mr-5`}>
                  solution
                  <img src={YellowCrosses} alt="" />
                </div>
                <span>you can trust.</span>
              </div>
              <div>
                <p className="text-gray-450 text-base md:text-lg">
                  Secure your future with a transparent and high yielding
                  interest pension plan that is truly yours.
                </p>
              </div>
              <div className="mt-16 mb-10">
                <ConnectButton />
              </div>
            </div>
            <div
              className={`mt-16 pt-3 lg:mt-0 col-span-12 lg:col-span-6 2xl:col-span-7 ${styles.people_image_div}`}
            >
              <img src={peopleImage} alt="" />
              <div
                className={`${styles.pension_earnings} hidden xl:inline-flex flex-col items-center justify-center`}
              >
                <div className="flex items-center justify-center">
                  <CircleLoader />
                  <span className="absolute text-sm">100%</span>
                </div>
                <p className="mt-6">Pension Earnings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container hidden">
          <div className={`my-6 xl:mt-0 xl:mb-12 ${styles.logos}`}>
            <div className="grid grid-cols-4 gap-x-6 lg:gap-x-10 place-items-center place-content-between">
              <div className="m x-16 col-span-1">
                <img src={airbnbLogo} alt="" />
              </div>
              <div className="m x-16 col-span-1">
                <img src={hubspotLogo} alt="" />
              </div>
              <div className="m x-16 col-span-1">
                <img src={googleLogo} alt="" />
              </div>
              <div className="m x-16 col-span-1">
                <img src={microsoftLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_2} `}>
        <div className="container overflow-hidden">
          <div className="lg:mt-10 grid grid-cols-12 py-10 md:py-16">
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 mb-16">
              <div className={`${styles["header-text"]} text-white mb-10`}>
                Take a look at some of our metrics.
              </div>
              <div className="mb-10">
                <p className="text-gray-450 text-base md:text-lg">
                  Here's what we have been able to achieve over the short period
                  that we have been active. We are becoming the go to platform
                  for pension and retirement plans.
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex mb-2 items-baseline justify-start">
                    <span className={`${styles["big-number"]}`}>20</span>
                  </div>
                  <span className="text-base text-gray-450">Users</span>
                </div>
                <div>
                  <div className="flex mb-2 items-baseline justify-start">
                    <span className={`${styles["big-number"]}`}>$2.5K</span>
                  </div>
                  <span className="text-base text-gray-450">TVL</span>
                </div>
                <div>
                  <div className="flex mb-2 items-baseline justify-start">
                    <span className={`${styles["big-number"]}`}>$300</span>
                  </div>
                  <span className="text-base text-gray-450">
                    Interest Accrued
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles["map-image-container"]} col-span-12 lg:col-span-7 xl:col-span-8 `}
            >
              <img src={mapImage} alt="Map of active users" />
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_3} `}>
        <div className="container overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-8 md:gap-10 py-10 md:py-16">
            <div className={`col-1 ${styles["title-container"]}`}>
              <div className={`${styles["header-text"]} text-white mb-10`}>
                Getting Started
              </div>
              <div className="mb-10">
                <p className="text-gray-450 text-base md:text-lg">
                  Get in touch with the best choice for your pension plan,
                  <br className="hidden lg:block" /> with the various super
                  friendly services we offer.
                </p>
              </div>
            </div>
            <div
              className={`flex order-2 md:order-1 col-1 p-6 ${styles["cards"]}`}
            >
              <div className="grid grid-cols-7 ">
                <div className={`${styles["start-numbers"]}`}>
                  <span>2</span>
                </div>
                <div className="ml-4 md:mr-0 col-span-6 col-start-2 col-end-7 flex flex-col justify-center">
                  <p className="mb-5">Select a retirement plan</p>
                  <p className={`${styles["card-details"]}`}>
                    Select a percentage, funding interval and a lock-up period
                    for your funds to setup a plan.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`flex order-1 md:order-2 col-1 p-6 ${styles["cards"]}`}
            >
              <div className="grid grid-cols-7 ">
                <div className={`${styles["start-numbers"]}`}>
                  <span>1</span>
                </div>
                <div className="ml-4 md:mr-0 col-span-6 col-start-2 col-end-7 flex flex-col justify-center">
                  <p className="mb-5">Register on the platform</p>
                  <p className={`${styles["card-details"]}`}>
                    Create an employee account with your name, email address,
                    details of next of kin, payment information and a wallet
                    address.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`flex order-3 md:order-3 col-1 p-6 ${styles["cards"]}`}
            >
              <div className="grid grid-cols-7 ">
                <div className={`${styles["start-numbers"]}`}>
                  <span>3</span>
                </div>
                <div className="ml-4 md:mr-0 col-span-6 col-start-2 col-end-7 flex flex-col justify-center">
                  <p className="mb-5">Activate your plan</p>
                  <p className={`${styles["card-details"]}`}>
                    Fund your wallet to activate your retirement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_4} `}>
        <div className="container lg:pt-10 pb-16">
          <div
            className={`${styles["header-text"]} text-center text-white pb-16`}
          >
            Our Features
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 grid-rows-2 gap-7 ">
            <div
              className={`${styles["cards"]} w-full py-10 col-span-1 lg:col-span-2 flex flex-col justify-center`}
            >
              <p className={`${styles["card-title"]} mb-4`}>
                Automated Savings
              </p>
              <p className={`${styles["card-details"]}`}>
                Simply fund your wallet and let the platform do the rest.
              </p>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-1 lg:col-span-2 flex flex-col justify-center`}
            >
              <p className={`${styles["card-title"]} mb-4`}>High interests</p>
              <p className={`${styles["card-details"]}`}>
                You can earn up to 15% APY. Traditional interest rates offer 1 –
                2% APY.
              </p>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-1 lg:col-span-2 flex flex-col justify-center`}
            >
              <p className={`${styles["card-title"]} mb-4`}>Security</p>
              <p className={`${styles["card-details"]}`}>
                Your funds are secured using the NEAR Finance Layer-2 DEFI
                Protocol.
              </p>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-1 lg:col-span-2 flex flex-col justify-center lg:col-start-2`}
            >
              <p className={`${styles["card-title"]} mb-4`}>
                Decentralized and Transparent
              </p>
              <p className={`${styles["card-details"]}`}>
                Funds are tamper-proof from third parties and all transactions
                are easily assessable.
              </p>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-1 lg:col-span-2 flex flex-col justify-center`}
            >
              <p className={`${styles["card-title"]} mb-4`}>
                Approved Withdrawals
              </p>
              <p className={`${styles["card-details"]}`}>
                Approve a next of kin for withdrawal of your funds, in the event
                of an emergency.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_5} `}>
        <div className="container lg:pt-10 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="col-span-1">
              <div
                className={`${styles["header-text"]} pb-8 md:pb-12 text-white`}
              >
                Fantastic Benefits
              </div>
            </div>
            <div className="col-span-1 text-gray-450 pb-8 md:pb-12 ">
              Get hold of our pension plans and enjoy the numerous benefits in
              all maximum.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
            <div
              className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-1`}
            >
              <div className="items-center grid grid-cols-9 gap-4">
                <div className="col-span-2">
                  <img src={apySvg} alt="" />
                </div>
                <div className="col-span-7 text-gray-450">
                  Earn up to 15% APY using NEAR Finance Layer-2 Defi Protocol.
                </div>
              </div>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-1`}
            >
              <div className="items-center grid grid-cols-9 gap-4">
                <div className="col-span-2">
                  <img src={securitySvg} alt="" />
                </div>
                <div className="col-span-7 text-gray-450">
                  Improved security and privacy using the power of the
                  blockchain.
                </div>
              </div>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-1`}
            >
              <div className="items-center grid grid-cols-9 gap-4">
                <div className="col-span-2">
                  <img src={personSvg} alt="" />
                </div>
                <div className="col-span-7 text-gray-450">
                  A decentralised structure with no third party interference.
                </div>
              </div>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-1`}
            >
              <div className="items-center grid grid-cols-9 gap-4">
                <div className="col-span-2">
                  <img src={chainSvg} alt="" />
                </div>
                <div className="col-span-7 text-gray-450">
                  Lower gas fees by leveraging the Binance Smart Chain network.
                </div>
              </div>
            </div>
            <div
              className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-1`}
            >
              <div className="items-center grid grid-cols-9 gap-4">
                <div className="col-span-2">
                  <img src={houseSvg} alt="" />
                </div>
                <div className="col-span-7 text-gray-450">
                  Earn NEAR tokens as interest, which can be withdrawn as stable
                  coins.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_6} `}>
        <div className="container lg:pt-10 pb-16">
          <div
            className={`${styles["header-text"]} text-center text-white mb-4 pb-7 md:pb-16`}
          >
            Roadmap
          </div>
          <div className="grid grid-cols-1 gap-y-16">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-x-5 gap-y-16">
              <div
                className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-4`}
              >
                <p className={`${styles["card-title"]} mb-5 pl-8`}>Q4, 2021</p>
                <ul className={`${styles["card-details"]}`}>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">Launch MVP.</span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Get financial support to fund further development.
                    </span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Marketing of the MVP and community development.
                    </span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Participate in the NEAR hackathon.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="place-self-center">
                <DottedLineSvg />
              </div>
              <div
                className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-4 lg:col-start-6`}
              >
                <p className={`${styles["card-title"]} mb-5 pl-8`}>Q1, 2022</p>
                <ul className={`${styles["card-details"]}`}>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Partnerships with companies to register their employees on
                      our pensions systems.
                    </span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Partnership with NEAR Finance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:hidden place-self-center">
              <DottedLineSvg />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-9 gap-x-5 gap-y-16">
              <div
                className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-4`}
              >
                <p className={`${styles["card-title"]} mb-5 pl-8`}>Q2, 2021</p>
                <ul className={`${styles["card-details"]}`}>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Integrating more stable coins.
                    </span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      More marketing and community expansion.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="place-self-center">
                <DottedLineSvg />
              </div>
              <div
                className={`${styles["cards"]} w-full py-10 col-span-full md:col-span-4 lg:col-start-6`}
              >
                <p className={`${styles["card-title"]} mb-5 pl-8`}>Q3, 2022</p>
                <ul className={`${styles["card-details"]}`}>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">Pre-Seed Raise</span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Expansion of team and further development
                    </span>
                  </li>
                  <li className="flex mb-3">
                    <span className="mr-3">
                      <img src={trophySvg} alt="" />
                    </span>
                    <span className="text-gray-450">
                      Rolling out new features
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="container text-center pb-16 lg:py-16">
        <span>Copyright {currentYear}, Beima Group</span>
      </footer>
    </main>
  );
}

export { LandingPage };
