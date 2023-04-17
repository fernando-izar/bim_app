import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { BuildingViewer } from "./components/BuildingViewer";
import { MapViewer } from "./components/MapViewer";
import { LoginForm } from "./components/user/LoginForm";
import { ContextProvider } from "./middleware/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/building" element={<BuildingViewer />} />
          <Route path="/map" element={<MapViewer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
