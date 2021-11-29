import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./appRouter";
import { Toast, Loader } from "./components";
import CombineProvider from "./contexts";

function App() {
  return (
    <div className="App">
      <Router basename={"/"}>
        <CombineProvider>
          <Loader />
          <Toast />
          <AppRouter />
        </CombineProvider>
      </Router>
    </div>
  );
}

export default App;
