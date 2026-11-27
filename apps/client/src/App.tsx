import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protected-route";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
