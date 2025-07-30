import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authRequests } from "../../api/auth/auth-requests";
import { useAuthContext } from "../../context/auth/use-auth-context";
import { toast } from "../../lib/toast";

type Props = {};

const LoginPage = (props: Props) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/reports";
  const { isAuthenticated, login } = useAuthContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // NOTE: zod + react-hook-form ishlatgan yaxshi bo'lar edi, bitta forma bo'lgani uchun qo'shmadim
  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      authRequests
        .login({
          password: formData.password,
          username: formData.username,
        })
        .then((res) => {
          login(res.token.token);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Login failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.username ? "border-red-500" : ""
            }`}
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
