import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/auth-context"
import { HomePage } from "./pages/home"
import { ProfilePage } from "./pages/profile"
import { AdminPage } from "./pages/admin"
import { LoginPage } from "./pages/login"
import { RegisterPage } from "./pages/register"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
