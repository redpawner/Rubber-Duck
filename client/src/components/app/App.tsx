import React from "react";
import { useStore } from "../../state-stores/state-stores";
import "./App.scss";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Reset from "./auth/reset/reset";
import CreateHelp from "./dashboard/create-help-request/create-help-request";
import Dashboard from "./dashboard/dashboard";

function App() {
  const reset = useStore((state) => state.counter);

  function renderSwitch() {
    switch (reset) {
      case 0:
        return <Register />;
      case 1:
        return <Login />;
      case 2:
        return <Reset />;
    }
  }

  return (
    <div className="container">
      {renderSwitch()}
      {/* <Dashboard />{" "} */}
    </div>
  );
}
export default App;
