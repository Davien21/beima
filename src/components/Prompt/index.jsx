import React, { useEffect } from "react";
import { Button } from "..";
// import Emitter from "../../services/emitter";
import styles from "./prompt.module.css";

function Prompt({ isActive, setIsActive, onWithdraw }) {
  let containerClass = `${styles["container"]}`;
  if (isActive) containerClass += ` ${styles["active"]}`;
  const closePrompt = () => {
    setIsActive(false);
  };

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";
    if (!isActive) document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive, setIsActive]);

  return (
    <div className={containerClass} onClick={closePrompt}>
      <div
        className={`${styles["prompt-body"]} p-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold mb-3">Withdrawal Confirmation</p>
        <p>Your withdrawal date is not yet due. </p>
        <div className={``}>
          Are you sure you want to force this withdrawal?
        </div>
        <div className="text-sm mt-2 mb-5 ">
          <span>NB: *You will be charged a </span>
          <span className="font-med-bold mx-1">20%</span>
          <span> penalty</span>
        </div>
        <div className={`${styles["special-btns"]} grid grid-cols-2 gap-x-5 gap-y-4 `}>
          <Button
            className="col-span-2 sm:col-span-1"
            text="Yes"
            onClick={onWithdraw}
          />
          <Button
            className="col-span-2 sm:col-span-1"
            text="No"
            onClick={closePrompt}
          />
        </div>
      </div>
    </div>
  );
}

export { Prompt };
