import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import BlogDataPage from "./pages/BlogDataPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  const { verify, isAuthenticated } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="w-full h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDataPage />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard/add-blog" element={isAuthenticated ? <AddBlogPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard/edit-blog/:id" element={isAuthenticated ? <EditBlogPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <SigninPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
