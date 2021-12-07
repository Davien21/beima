import { createContext, useContext, useEffect, useState } from "react";
import { depositAsset, genAddresses } from "../services/pensionService";
import { getUserDetails, userIsRegistered } from "../services/userService";
import { getCurrentNetwork, getBeimaContract } from "../services/web3Service";
import toast from "../utils/toastConfig";

const DashboardContext = createContext();

const coinAssets = [
  { name: "cUSDT", address: "0x3f0A0EA2f86baE6362CF9799B523BA06647Da018" },
  { name: "USDT", address: "0x07de306FF27a2B630B1141956844eB1552B956B5" },
  { name: "USDC", address: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede" },
  { name: "ETH", address: "" },
  { name: "TUSD", address: "" },
];

// const history = [...initPensions];

export function DashboardProvider({ children }) {
  const [pensions, setPensions] = useState([]);
  const [user, setUser] = useState(null);
  const [coins] = useState(coinAssets);
  const [isRegistered, setIsRegistered] = useState(true);

  const addNewPensionPlan = (plan) => {
    if (pensions.length) return setPensions([{ ...plan }, ...pensions]);
    setPensions([{ ...plan }]);
  };

  useEffect(() => {
    (async () => {
      const network = await getCurrentNetwork();
      if (network && network !== "rinkeby") {
        return toast.error("Please Switch to the Rinkeby Test Network");
      }
      // genAddresses()
      const beima = await getBeimaContract();
      const registerStatus = await userIsRegistered();
      const data = await getUserDetails();
      const { user, pension } = data;
      console.log({ user, pension });
      setUser(user);
      if (pension) setPensions([{ ...pension }]);
      setIsRegistered(registerStatus);
      console.log(beima);
    })();
  }, [setIsRegistered]);

  return (
    <DashboardContext.Provider
      value={{
        isRegistered,
        setIsRegistered,
        setUser,
        pensions,
        addNewPensionPlan,
        coins,
        user,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context)
    throw new Error(
      "Dashboard context must be used inside a `DashboardProvider`"
    );

  return context;
}
