import { Link, useNavigate, } from "react-router-dom";
import React, { useState } from "react";

const Auth = () => {
  const navigate = useNavigate();
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
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (isRegister && formData.mot_de_pass !== formData.confirm_password) {
      setMessage("Les mots de passe ne correspondent pas!");
      setLoading(false);
      return;
    }

    const action = isRegister ? "register" : "login";
    const payload = isRegister 
      ? formData 
      : { email: formData.email, mot_de_pass: formData.mot_de_pass };

    try {
      const response = await fetch(
        "https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/auth.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "1",
          },
          body: JSON.stringify({ action, ...payload }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      if (data.id_user) {
        localStorage.setItem("user_id", data.id_user);
        const cartId = `cart_${data.id_user}`;
        localStorage.setItem("id_cart", cartId);
        setMessage("Connexion réussie");
        console.log("User logged in:", data.id_user);
        console.log("Cart ID:", cartId);
      } else {
        setMessage(data.message || "Inscription réussie!");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
          {isRegister ? "Inscription" : "Connexion"}
        </h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded ${
            message.includes("réussie") 
              ? "bg-green-100 text-green-600" 
              : "bg-red-100 text-red-600"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="numero_telephone"
                placeholder="Numéro de téléphone"
                value={formData.numero_telephone}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="password"
            name="mot_de_pass"
            placeholder="Mot de passe"
            value={formData.mot_de_pass}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          
          {isRegister && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirmer le mot de passe"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
          )}

          {message === "Connexion réussie" ? (
            <button
              onClick={handleNavigateHome}
              className="w-full p-3 text-white bg-green-500 rounded hover:bg-green-600 transition"
            >
              Aller à l'accueil
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              {loading ? "Traitement..." : isRegister ? "S'inscrire" : "Se connecter"}
            </button>
          )}
        </form>

        <p className="mt-4 text-center">
          {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
              setFormData({
                nom: "",
                prenom: "",
                numero_telephone: "",
                email: "",
                mot_de_pass: "",
                confirm_password: "",
              });
            }}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isRegister ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;