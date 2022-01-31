import React, { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { metaMaskIcon, wallectConnectIcon } from "../../assets";
import { useAppContext } from "../../contexts/appContext";
import styles from "./connect-modal.module.css";

function ConnectModal(props) {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const { isConnectModalOpen, setIsConnectModalOpen } = useAppContext();
  const closeModal = () => {
    setIsConnectModalOpen(true);
  };
  const connectWithMetaMask = async () => {
    const user = await authenticate();
    const address = user.attributes.accounts[0]; 
    console.log({ address });
  };

  const connectWithWalletConnect = async () => {
    const user = await authenticate({ provider: "walletconnect" });
    const address = user.attributes.accounts[0]; 
    console.log({ address });
  };

  const containerRef = useRef();
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]}`
  );
  useEffect(() => {
    document.body.style.overflow = isConnectModalOpen ? "hidden" : "auto";
    if (isConnectModalOpen) {
      containerRef.current.style.display = "flex";
      setTimeout(() => {
        setContainerClass((value) => (value += ` ${styles["active"]}`));
      }, 50);
    }
    if (!isConnectModalOpen) {
      document.body.style.overflow = "auto";
      setContainerClass(`${styles["container"]}`);
      setTimeout(() => {
        containerRef.current.style.display = "none";
      }, 400);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isConnectModalOpen, setIsConnectModalOpen]);

  return (
    <div ref={containerRef} className={containerClass} onClick={closeModal}>
      <div className={`${styles["modal-body"]} mx-4 md-mx-0`}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 p-4">
            <div
              className={`${styles["provider"]} p-8`}
              onClick={connectWithMetaMask}
            >
              <div className="flex flex-col items-center">
                <img src={metaMaskIcon} alt="Connect to MetaMask" />
                <h3 className={`${styles["title"]} py-4`}>MetaMask</h3>
                <p className={`${styles["subtitle"]}`}>
                  Connect to your MetaMask Wallet
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 p-4">
            <div
              className={`${styles["provider"]} p-8`}
              onClick={connectWithWalletConnect}
            >
              <div className="flex flex-col items-center">
                <img src={wallectConnectIcon} alt="Connect to Wallet Connect" />
                <h3 className={`${styles["title"]} py-4`}>WalletConnect</h3>
                <p className={`${styles["subtitle"]}`}>
                  Scan with WalletConnect to connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConnectModal };
