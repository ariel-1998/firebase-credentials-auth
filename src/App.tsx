import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route path="/signup" Component={Signup} />
              <Route path="/login" Component={Login} />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
