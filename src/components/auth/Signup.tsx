import { useNavigate } from "react-router";
import { useState } from "react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [authLoader, setAuthLoader] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axiosInstance.post("/api/v1/auth/register", formData)
      .then(() => {
        toast.success("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Registration failed: " + (error.response?.data.message || error.message));
        console.error("Registration failed:", error.response?.data || error.message);
      })
      .finally(() => {
        setAuthLoader(false);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
        <div className="bg-white rounded-md shadow-xl px-8 py-4 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account 👋
          </h2>
          <p className="text-gray-500 mb-6">Sign up to get started</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-start py-5 text-start"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={authLoader}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              {authLoader ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="py-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Signup;
