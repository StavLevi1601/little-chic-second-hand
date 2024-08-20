import Login from "./components/login/Login";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import useAuthStore from "./store/store";

function App() {
  const { isAuthenticated } = useAuthStore();
  console.log("isAuthenticated", isAuthenticated);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? <Route path="/" element={<Welcome />} /> : null}
        </Routes>
      </Router>
    </>
  );
}

export default App;
