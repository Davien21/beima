import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./appRouter";
import { Toast, Loader } from "./components";
import { AppProvider } from "./contexts/appContext";

const { REACT_APP_MORALIS_APP_ID, REACT_APP_MORALIS_SERVER_URL } = process.env;

function App() {
  if (!REACT_APP_MORALIS_APP_ID || !REACT_APP_MORALIS_SERVER_URL) {
    throw new Error("Missing Moralis Credentials.");
  }
  return (
    <div className="App">
      <Router basename={"/"}>
        <MoralisProvider
          appId={REACT_APP_MORALIS_APP_ID}
          serverUrl={REACT_APP_MORALIS_SERVER_URL}
        >
          <AppProvider>
            <Loader />
            <Toast />
            <AppRouter />
          </AppProvider>
        </MoralisProvider>
      </Router>
    </div>
  );
}

export default App;
