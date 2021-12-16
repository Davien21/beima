import Emitter from "../services/emitter";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserDetails, userIsRegistered } from "../services/userService";
import { getBeimaContract, getCurrentNetwork } from "../services/web3Service";
import toast from "../utils/toastConfig";
import { useAppContext } from "./appContext";
import { allowedNetwork, networkNames } from "../utils";

const DashboardContext = createContext();

const coinAssets = [
  { name: "cUSDT", address: "0x2fB298BDbeF468638AD6653FF8376575ea41e768" },
  { name: "USDT", address: "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02" },
  { name: "BUSD", address: "0x3b1F033dD955f3BE8649Cc9825A2e3E194765a3F" },
  { name: "USDC", address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b" },
];

export function DashboardProvider({ children }) {
  const { shouldResetApp, setShouldResetApp } = useAppContext();
  const [pensions, setPensions] = useState([]);
  const [user, setUser] = useState(null);
  const [hasPlan, setHasPlan] = useState(false);
  const [coins] = useState(coinAssets);
  const [isRegistered, setIsRegistered] = useState(true);

  const addNewPensionPlan = useCallback(
    (plan) => {
      if (pensions.length) return setPensions([{ ...plan }, ...pensions]);
      setPensions([{ ...plan }]);
    },
    [pensions]
  );

  const updatePensionPlan = useCallback(
    (id, newState) => {
      const currentPensionState = [...pensions];
      currentPensionState.splice(id - 1, 1, newState);
      setPensions(currentPensionState);
    },
    [pensions]
  );

  const loadApp = () =>
    (async () => {
      Emitter.emit("OPEN_LOADER");
      const currentNetwork = await getCurrentNetwork();
      if (currentNetwork && currentNetwork !== allowedNetwork) {
        return toast.error(
          `Please Switch to the ${networkNames[allowedNetwork]}`
        );
      }
      const beima = await getBeimaContract();
      const registerStatus = await userIsRegistered();
      const data = await getUserDetails();
      const { user, pension } = data;
      setUser(user);
      if (pension) setPensions([{ ...pension }]);
      setIsRegistered(registerStatus);
      Emitter.emit("CLOSE_LOADER");
      console.log(beima);
    })();

  useEffect(() => {
    loadApp();
    if (shouldResetApp) {
      setShouldResetApp(false);
      loadApp();
    }
  }, [setIsRegistered, shouldResetApp, setShouldResetApp]);

  return (
    <DashboardContext.Provider
      value={{
        isRegistered,
        setIsRegistered,
        hasPlan,
        setHasPlan,
        setUser,
        pensions,
        addNewPensionPlan,
        updatePensionPlan,
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
