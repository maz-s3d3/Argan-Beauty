import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const navigate=useNavigate()
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numero_telephone: "",
    email: "",
    mot_de_pass: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (isRegister && formData.mot_de_pass !== formData.confirm_password) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    const action = isRegister ? "register" : "login";
    const payload = isRegister
      ? formData
      : { email: formData.email, mot_de_pass: formData.mot_de_pass };

    try {
      const response = await fetch(
        "https://2f98-196-117-24-244.ngrok-free.app/auth.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
          body: JSON.stringify({ action, ...payload }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      setMessage(data.message || "Success!");
      if (!isRegister && data.id_user) {
        localStorage.setItem("user_id", data.id_user);
        navigate("/")
        
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
        </div>
        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.includes("error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="nom"
                  placeholder="Last Name"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="First Name"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <input
                type="tel"
                name="numero_telephone"
                placeholder="Phone Number"
                value={formData.numero_telephone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="mot_de_pass"
            placeholder="Password"
            value={formData.mot_de_pass}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {isRegister && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          )}
          <button
            type="submit"
            className={`w-full p-2 text-white rounded ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : isRegister ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
