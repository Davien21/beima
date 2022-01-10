import React, { useEffect, useState } from "react";
import styles from "./profile-setup-form.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { formsBgImage } from "../../../assets/images";
import { LeftArrow } from "../../../assets/svg";

import { Button, CheckboxInput } from "../../index";
import { Input } from "../../Input";
import { ipfsMini } from "../../../services/ipfs";
import { registerUser } from "../../../services/userService";
import { useDashboardContext } from "../../../contexts/dashboardContext";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  dob: Yup.string().required("Date of birth is required"),
  NfirstName: Yup.string().required("First Name is required"),
  NlastName: Yup.string().required("Last Name is required"),
  Nemail: Yup.string().required("Email is required"),
  Nphone: Yup.string().required("Phone Number is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  NfirstName: "",
  NlastName: "",
  Nemail: "",
  Nphone: "",
};

function ProfileSetupForm() {
  const { setIsRegistered, setUser } = useDashboardContext();
  const currentYear = new Date().getFullYear();

  const [page, setPage] = useState(1);
  const [privacyIsChecked, setPrivacyIsChecked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleSubmit = (values) => {
    (async () => {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        nextOfKin: {
          firstName: values.NfirstName,
          lastName: values.NlastName,
          email: values.Nemail,
          phone: values.Nphone,
        },
      };
      const userIpfsHash = await ipfsMini.addJSON(user);

      const onRegister = () => {
        setIsRegistered(true);
        setUser(user);
      };

      await registerUser(userIpfsHash, onRegister);
    })();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={`${styles["container"]} `}>
      <div className="">
        <div
          className={`${styles["modal"]} py-5 text-white rounded`}
          style={{ backgroundImage: `url(${formsBgImage})` }}
        >
          <div className={`${styles["modal-content"]} pb-20`}>
            <div className={` ${styles["form-title"]}`}>
              {page === 1 && (
                <div className="flex flex-wrap items-center mt-32 md:mt-0">
                  <span className={`${styles["colored-prefix"]} mr-2`}>
                    Beima
                  </span>
                  <span> KYC profile setup</span>
                </div>
              )}
              {page === 2 && (
                <div className="flex flex-wrap items-center">
                  <div
                    title="Go Back"
                    className="cursor-pointer mt-32 md:mt-0 inline-flex items-center"
                    onClick={() => setPage(1)}
                  >
                    <span>
                      <LeftArrow />
                    </span>
                    <span className="ml-3 md:hidden">Back</span>
                  </div>

                  <div className="flex items-center pt-5 md:pt-0">
                    <span className={`${styles["colored-prefix"]} mr-2`}>
                      Next
                    </span>
                    <span> of kin details</span>
                  </div>
                </div>
              )}
            </div>
            <form className="lg:mt-10" onSubmit={formik.handleSubmit}>
              <div className={page === 2 ? "hidden" : ""}>
                <div className="md:flex gap-x-6">
                  <Input
                    name="firstName"
                    formik={formik}
                    label="First Name"
                    className={`${styles["inputs"]} mb-6`}
                  />
                  <Input
                    name="lastName"
                    formik={formik}
                    label="Last Name"
                    className={`${styles["inputs"]} mb-6`}
                  />
                </div>
                <div className="md:flex gap-x-6">
                  <Input
                    name="email"
                    formik={formik}
                    label="Email"
                    className={`${styles["inputs"]} mb-6`}
                  />
                  <Input
                    name="phone"
                    formik={formik}
                    label="Phone Number"
                    className={`${styles["inputs"]} mb-6`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-6 items-end">
                  <div className={`${styles["dob-input"]}`}>
                    <label className="mb-2" htmlFor={"dob"}>
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      className={
                        formik.touched["dob"] && formik.errors?.["dob"]
                          ? `${styles["error"]}`
                          : ""
                      }
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      value={formik?.values["dob"]}
                    />
                    {formik.touched["dob"] && (
                      <div className={`${styles["error-message"]}`}>
                        {formik.errors?.["dob"]}
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={(e) => {
                      setPage(2);
                      e.preventDefault();
                    }}
                    className={`${styles["form-btn"]}`}
                    text="NEXT"
                  />
                </div>
              </div>
              <div className={page === 1 ? "hidden" : ""}>
                <div className="md:flex gap-x-6">
                  <Input
                    name="NfirstName"
                    formik={formik}
                    label="First Name"
                    className={`${styles["inputs"]} mb-6`}
                  />
                  <Input
                    name="NlastName"
                    formik={formik}
                    label="Last Name"
                    className={`${styles["inputs"]} mb-6`}
                  />
                </div>
                <div className="md:flex gap-x-6">
                  <Input
                    name="Nemail"
                    formik={formik}
                    label="Email"
                    className={`${styles["inputs"]} mb-6`}
                  />
                  <Input
                    name="Nphone"
                    formik={formik}
                    label="Phone Number"
                    className={`${styles["inputs"]} mb-6`}
                  />
                </div>
                <div className="lg:flex justify-between items-center">
                  <div className="flex mb-5 lg:mb-0 pr-4 items-center">
                    <div className={`pr-4 flex ${styles["check-box"]}`}>
                      <CheckboxInput
                        isActive={privacyIsChecked}
                        onToggle={() => setPrivacyIsChecked(!privacyIsChecked)}
                      />
                    </div>
                    <div className="text-sm">
                      <span>I agree to all statements included in the </span>
                      <span className={`${styles["privacy-policy"]}`}>
                        Privacy Policy
                      </span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="ml-auto w-full lg:w-auto"
                    text="NEXT"
                  />
                </div>
              </div>
              <p className="text-center mt-8">
                Beima all rights reserved {currentYear}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProfileSetupForm };
