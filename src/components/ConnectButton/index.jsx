import { Button } from "../Button";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../contexts/appContext";
import styles from "./connect-button.module.css";
import toast from "../../utils/toastConfig";

function ConnectButton() {
  const history = useHistory();
  const { handleWalletConnect, hasMetaMask, isConnected } = useAppContext();

  async function connect() {
    const connectionStatus = await handleWalletConnect();
    if (!connectionStatus) return;
    history.push("/dashboard");
  }

  function showUpgradingAlert() {
    toast.info(
      "We are currently undergoing a major upgrade on our platform. \n Please try again later."
    );
  }

  return (
    <div className={`${styles["container"]}`}>
      {!hasMetaMask && (
        <div className="">
          <a
            rel="noreferrer"
            referrerPolicy="no-referrer"
            target="_blank"
            href="https://metamask.io/download"
          >
            Get Meta mask
          </a>
        </div>
      )}
      {hasMetaMask && (
        <Button onClick={showUpgradingAlert} className="font-medium">
          {isConnected ? "Open Dashboard" : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}

export { ConnectButton };
