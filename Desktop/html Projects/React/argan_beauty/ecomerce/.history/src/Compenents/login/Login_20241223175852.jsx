import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
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
    const payload = isRegister ? formData : { email: formData.email, mot_de_pass: formData.mot_de_pass };

    try {
      const response = await fetch(
        "https://fe14-196-117-24-244.ngrok-free.app/Argan_beauty/auth.php",
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
      if (!isRegister) {
        localStorage.setItem("user_id", data.id_user); // Store user_id/token
        console.log("User logged in:", data.id_user);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
          {isRegister ? "Register" : "Login"}
        </h1>
        {message && (
          <p
            className={`mb-4 p-3 rounded ${
              message.includes("error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
             
              <input
                type="text"
                name="nom"
                placeholder="Last Name"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded"
              />
               <input
                type="text"
                name="prenom"
                placeholder="First Name"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                name="numero_telephone"
                placeholder="Phone Number"
                value={formData.numero_telephone}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded"
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            name="mot_de_pass"
            placeholder="Password"
            value={formData.mot_de_pass}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          {isRegister && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
          )}
          {message==="Login successful."?
          <button className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600">
            
            Go to Home
            </Link>
          </button>
          :<button
          type="submit"
          disabled={loading}
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : isRegister ? "Register" : "Login"}
        </button>}
          
        </form>
        <p className="mt-4 text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          
          
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 underline"
            >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
