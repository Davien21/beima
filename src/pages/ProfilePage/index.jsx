import React, { useEffect } from "react";
import { logoImage } from "../../assets/images";
import { useDashboardContext } from "../../contexts/dashboardContext";
import styles from "./profile-page.module.css";
import { useHistory } from "react-router";
import toast from "../../utils/toastConfig";
import Emitter from "../../services/emitter";

function ProfilePage(props) {
  const history = useHistory();
  const { user, isRegistered } = useDashboardContext();

  useEffect(() => {
    Emitter.emit("OPEN_LOADER");
    if (!isRegistered) {
      toast.error("You have not registered");
      setTimeout(() => {
        Emitter.emit("CLOSE_LOADER");
        history.push("/dashboard");
      }, 3000);
    }
    if (user) return Emitter.emit("CLOSE_LOADER");
  }, [user, isRegistered, history]);

  if (!user) return <div></div>;
  return (
    <main className={`${styles["container"]} container pb-20`}>
      <section>
        <header className="">
          <div className="pt-20 pb-20 lg:pt-16 lg:pb-10">
            <div className={`${styles["profile-img"]}`}>
              <img src={logoImage} alt="" />
            </div>
            <div className="flex items-center justify-center">
              <span className="text-center text-4xl">
                <strong>{user?.firstName}</strong> {user?.lastName}
              </span>
            </div>
          </div>
        </header>
      </section>
      <section className="mt-28">
        <div className="grid grid-cols-2 gap-x-10">
          <div className="col-span-2 flex flex-col lg:col-span-1 mb-10 lg:mb-0">
            <p className={`${styles["head-text"]}`}>Your Details</p>
            <div className={`${styles["block"]} h-full mt-5 px-10 py-8`}>
              <div className="flex flex-wrap gap-x-5 my-2">
                <span className={`${styles["detail-title"]} pr-2`}>Email:</span>
                <span
                  className={`col-span-4 ${styles["detail"]}`}
                >{`${user?.email}`}</span>
              </div>
              <div className="flex flex-wrap gap-x-5 my-2">
                <span className={`${styles["detail-title"]} pr-2`}>
                  Phone Number:
                </span>
                <span
                  className={`col-span-4 ${styles["detail"]}`}
                >{`${user?.phone}`}</span>
              </div>
              <div className="flex flex-wrap gap-x-5 my-2">
                <span className={`${styles["detail-title"]} pr-2`}>
                  Date of Birth:
                </span>
                <span
                  className={`col-span-4 ${styles["detail"]}`}
                >{`${user?.dob}`}</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col lg:col-span-1">
            <p className={`${styles["head-text"]}`}>Next of Kin Details</p>
            <div className={`${styles["block"]} h-full mt-5 px-10 py-8`}>
              <div className="flex flex-wrap gap-x-5 my-2">
                <span className={`${styles["detail-title"]} pr-2`}>Name:</span>
                <span
                  className={`col-span-4 ${styles["detail"]}`}
                >{`${user?.nextOfKin.firstName} ${user?.nextOfKin.lastName}`}</span>
              </div>
              <div className="flex flex-wrap gap-x-5 my-2">
                <span className={`${styles["detail-title"]} pr-2`}>Email:</span>
                <span
                  className={`col-span-4 ${styles["detail"]}`}
                >{`${user?.nextOfKin.email}`}</span>
              </div>
              <div className="flex flex-wrap gap-x-5 my-2">
                <span className={`${styles["detail-title"]} pr-2`}>
                  Phone Number:
                </span>
                <span
                  className={`col-span-4 ${styles["detail"]}`}
                >{`${user?.nextOfKin.phone}`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export { ProfilePage };
