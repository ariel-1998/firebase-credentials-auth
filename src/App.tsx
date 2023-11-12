import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import AuthProvider from "./context/AuthContext";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: 400 }}>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute redirect="/login" />}>
                <Route path="/" Component={Dashboard} />
                <Route path="/update-profile" Component={UpdateProfile} />
              </Route>
              <Route path="/signup" Component={Signup} />
              <Route path="/login" Component={Login} />
              <Route path="/forgot-password" Component={ForgotPassword} />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
