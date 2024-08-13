import { FormProvider, useForm } from "react-hook-form";
import Login from "./components/login/Login";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginSchema, loginSchema } from "./validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Welcome from "./components/welcome/welcome";

function App() {
  const method = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <FormProvider {...method}>
                <Login />
              </FormProvider>
            }
          />
          <Route path="/welcome/:username" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
