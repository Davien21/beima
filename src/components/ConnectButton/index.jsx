import { Button } from "../Button";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../contexts/appContext";
import styles from "./connect-button.module.css";

// function ConnectButton() {
  const history = useHistory();
  const { handleWalletConnect, hasMetaMask } = useAppContext();

  async function connect() {
    const connectionStatus = await handleWalletConnect();
    if (!connectionStatus) return;
    // history.push("/dashboard");
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
        <Button onClick={connect} className="font-medium">
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export { ConnectButton };
