import Emitter from "../services/emitter";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserDetails, userIsRegistered } from "../services/userService";
import { getCurrentNetwork } from "../services/web3Service";
import toast from "../utils/toastConfig";
import { useAppContext } from "./appContext";

const DashboardContext = createContext();

// A list of coin assets and addresses on Aurora testnet
const coinAssets = [
  { name: "USDC", address: "0x4C91929CBF9a3cACac0DEb220c1A82f50CA6Eb29" },
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
      const network = await getCurrentNetwork();
      if (network && network !== "Aurora testnet") {
        return toast.error("Please Switch to the Aurora testnet");
      }
      // const beima = await getBeimaContract();
      const registerStatus = await userIsRegistered();
      const data = await getUserDetails();
      const { user, pension } = data;
      setUser(user);
      if (pension) setPensions([{ ...pension }]);
      if (!pension) setPensions([]);
      setIsRegistered(registerStatus);
      Emitter.emit("CLOSE_LOADER");
      // console.log(beima);
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
