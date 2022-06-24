import React from "react";
import useStore from "../../state-stores/state-stores";
import "./App.scss";
import CreateHelp from "./dashboard/create-help-request/create-help-request";
import Dashboard from "./dashboard/dashboard";

function App() {
  const bears = useStore((state) => state.show);

  return (
    <div className="container">{!bears ? <Dashboard /> : <CreateHelp />}</div>
  );
}

export default App;
