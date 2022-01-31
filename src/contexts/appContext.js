import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  listenToAccountChanges,
  hasEthereum,
  unmountEthListeners,
  listenToNetworkChanges,
} from "../services/web3Service";

import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";

const AppContext = createContext();

export function AppProvider({ children }) {
  const { authenticate, logout, account, Moralis, isAuthenticated } =
    useMoralis();
  const history = useHistory();
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const [shouldResetApp, setShouldResetApp] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const connectToMetaMask = useCallback(() => {
    return (async () => {
      try {
        let user = await Moralis.Web3.authenticate({
          signingMessage: "Log in to Beima with Moralis",
          provider: "Injected",
        });

        return user;
      } catch (error) {
        return false;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticate]);

  const handleWalletConnect = useCallback(() => {
    return (async () => {
      return await connectToMetaMask();
    })();
  }, [connectToMetaMask]);

  useEffect(() => {
    (async () => {
      if (!account && isConnected) {
        setIsConnected(false);
        await logout();
      }
    })();
  }, [account, isConnected, logout]);

  useEffect(() => {
    if (isAuthenticated) setIsConnected(true);
    if (!isAuthenticated) setIsConnected(false);
  }, [isAuthenticated]);

  const resetValues = useCallback(() => {
    return (async () => {
      setShouldResetApp(true);
      return true;
    })();
  }, []);

  const handleWalletDisconnect = async () => {
    await logout();
    setIsConnected(false);
    history.replace("/");
  };

  const handleAccountChanged = (address) => {
    resetValues();
  };

  const handleNetworkChanged = () => {
    resetValues();
  };

  useEffect(() => {
    if (!hasEthereum()) return;
    listenToAccountChanges(handleAccountChanged);
    listenToNetworkChanges(handleNetworkChanged);
    return unmountEthListeners();
  });

  useEffect(() => {
    if (!hasEthereum()) {
      console.log("Please Install Meta Mask");
      return setHasMetaMask(false);
    }
    // if (account) setIsConnected(true);
    return;
  }, [account, handleWalletConnect]);

  return (
    <AppContext.Provider
      value={{
        isConnected,
        setIsConnected,
        handleWalletConnect,
        handleWalletDisconnect,
        hasMetaMask,
        shouldResetApp,
        setShouldResetApp,
        isConnectModalOpen,
        setIsConnectModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used inside a `AppProvider`");

  return context;
}
