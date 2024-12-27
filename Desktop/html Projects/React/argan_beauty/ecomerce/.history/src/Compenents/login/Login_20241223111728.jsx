import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
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
      setMessage("Les mots de passe ne correspondent pas!");
      setLoading(false);
      return;
    }

    const action = isRegister ? "register" : "login";
    const payload = isRegister ? formData : { email: formData.email, mot_de_pass: formData.mot_de_pass };

    try {
      const response = await fetch(
        "https://fe14-196-117-24-244.ngrok-free.app/auth.php",
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
        throw new Error(data.error || "Une erreur s'est produite");
      }

      setMessage(data.message || "Succès!");
      if (!isRegister) {
        localStorage.setItem("user_id", data.id_user);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl mt-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegister ? "Créer un compte" : "Connexion"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegister ? "Rejoignez Argan Beauty" : "Bienvenue chez Argan Beauty"}
          </p>
        </div>

        {message && (
          <div className={`rounded-md p-4 ${
            message.includes("error") ? 
            "bg-red-50 text-red-700 border border-red-200" : 
            "bg-green-50 text-green-700 border border-green-200"
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {isRegister && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
                  <input
                    type="text"
                    name="numero_telephone"
                    placeholder="Numéro de téléphone"
                    value={formData.numero_telephone}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
              </>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
              <input
                type="password"
                name="mot_de_pass"
                placeholder="Mot de passe"
                value={formData.mot_de_pass}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            {isRegister && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            )}
          </div>

          {message === "Login successful." ? (
            <Link to="/">
              <button className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Accéder à l'accueil
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              {loading ? "Traitement..." : isRegister ? "S'inscrire" : "Se connecter"}
            </button>
          )}

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-green-600 hover:text-green-500 font-medium transition-colors"
            >
              {isRegister ? "Déjà inscrit ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;