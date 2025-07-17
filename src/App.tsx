import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import QAPage from "./components/QAPage";
import ResultPage from "./components/ResultPage";
import SettingsPage from "./components/SettingsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/template/:templateId" element={<QAPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
