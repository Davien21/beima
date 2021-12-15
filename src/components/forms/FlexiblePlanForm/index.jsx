import React, { useEffect, useState } from "react";
import styles from "./flexible-plan-form.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  barchartImage,
  barchartNShadowImage,
  formsBgImage,
} from "../../../assets/images";
import { InputGroup } from "../../InputGroup";
import LockTimeInput from "../components/LockTimeInput";
import { Button, CheckboxInput, CloseButton } from "../../index";
import { useDashboardContext } from "../../../contexts/dashboardContext";
import { createFlexiblePlan } from "../../../services/pensionService";
import { ipfsMini } from "../../../services/ipfs";

const validationSchema = Yup.object({
  deposit: Yup.number().required("An Amount in USDT is required"),
  lockTime: Yup.number()
    .min(1, "Minimum Lock time allowed is 1 month")
    .required("An expected maturity date is required"),
});

const initialValues = {
  deposit: "",
  lockTime: "",
};

const today = new Date().toLocaleDateString();

function FlexiblePlanForm({ isOpen, onClose }) {
  const { addNewPensionPlan, coins } = useDashboardContext();
  const [privacyIsChecked, setPrivacyIsChecked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleSubmit = (values) => {
    const noOfMonths = values.lockTime;
    const maturityDate = new Date(
      new Date().getTime() + noOfMonths * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
    const lockTimeInseconds = noOfMonths * 30 * 24 * 3600;

    const totalAmount = (values.lockTime * values.deposit).toString();
    const monthlyDeposit = values.deposit.toString();
    const plan = {
      name: "Flexible",
      monthlyDeposit,
      totalDeposit: "0",
      percentageReturn: 10,
      maturityDate,
      interest: { currency: "XEND", amount: "0" },
      dateCreated: today,
    };
    const coin = coins.find((coin) => coin.name === "BUSD").address;
    (async () => {
      const planIpfsHash = await ipfsMini.addJSON({ ...plan });

      const onAddPlan = () => {
        addNewPensionPlan(plan);
        onClose();
      };

      const onError = () => {
        onClose();
      };

      await createFlexiblePlan(
        coin,
        planIpfsHash,
        totalAmount,
        monthlyDeposit,
        lockTimeInseconds,
        onAddPlan,
        onError
      );
    })();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={`${styles["container"]}`} onClick={onClose}>
      <div className="">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${styles["modal"]} text-white rounded`}
          style={{ backgroundImage: `url(${formsBgImage})` }}
        >
          <CloseButton onClick={onClose} />
          <div className={`${styles["bg-img"]} hidden lg:block`}>
            <img src={barchartNShadowImage} alt="" />
          </div>
          <div className={`${styles["modal-content"]} pb-16`}>
            <div className={`mb-10 ${styles["form-title"]}`}>
              <div className="flex flex-wrap lg:block gap-x-2">
                <div className="lg:hidden">
                  <img src={barchartImage} alt="" />
                </div>
                <div>
                  <span>Beima </span>
                  <span>Flexible Plan</span>
                </div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className=" mb-10">
                <InputGroup
                  type="tel"
                  placeholder="0.00"
                  name="deposit"
                  formik={formik}
                  label="Monthly Deposit"
                  className={`${styles["inputs"]} mb-8`}
                >
                  <span className={`${styles["usdt"]} px-4 py-3`}>USDT</span>
                </InputGroup>
              </div>
              <LockTimeInput
                name="lockTime"
                formik={formik}
                label="Number of Months (1month = 30days)"
                className={`${styles["inputs"]} mb-8`}
              />
              <div className="lg:flex flex-wrap justify-between items-center">
                <div className="flex mb-5 lg:mb-0 pr-4">
                  <div className="pr-4">
                    <CheckboxInput
                      isActive={privacyIsChecked}
                      onToggle={() => setPrivacyIsChecked(!privacyIsChecked)}
                    />
                  </div>
                  <div className="text-sm mb-3">
                    <span>I agree to all statements included in the </span>
                    <span className={`${styles["privacy-policy"]}`}>
                      Privacy Policy
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="ml-auto w-full lg:w-auto mt-1"
                  text="APPROVE"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FlexiblePlanForm };
