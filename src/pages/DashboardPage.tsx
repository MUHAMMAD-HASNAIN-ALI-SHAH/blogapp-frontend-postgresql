import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import DashboardMain from "../components/dashboard/DashboardMain";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAuthenticatedLoading } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticatedLoading && !isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, isAuthenticatedLoading, navigate]);

  if (isAuthenticatedLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="w-32 h-32 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <DashboardMain />;
}

export default DashboardPage
