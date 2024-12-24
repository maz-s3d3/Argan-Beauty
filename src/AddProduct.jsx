
import React, { useEffect, useState } from "react";
import {Package,Upload,DollarSign,Info,Tag,Layers,MapPin,Shield} from 'lucide-react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    nom_produit: "",
    description_courte: "",
    description_complete: "",
    prix: "",
    stock: "",
    id_categorie: "",
    origine: "",
    certification: "",
    poids: "",
    unite_poids: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/categorie.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1"
      },
    })
    .then((response) => {
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status} `)
      }
      return response.json();
    })
    .then((data) => { setCategories(data) })
    .catch((error) => {
      setError(error.message)
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="spinner animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de Chargement</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (image) {
      data.append("image_principale", image);
    }

    try {
      const response = await fetch("https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      setMessage(result.message || "Produit ajouté avec succès !");
      setFormData({
        nom_produit: "",
        description_courte: "",
        description_complete: "",
        prix: "",
        stock: "",
        id_categorie: "",
        origine: "",
        certification: "",
        poids: "",
        unite_poids: "",
        
      });
      setImage(null);
    } catch (error) {
      setMessage("Une erreur inattendue s'est produite.");
      console.error("Erreur lors de l'ajout du produit:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-blue-600 text-white flex items-center">
          <Package className="mr-4 w-10 h-10" />
          <h1 className="text-3xl font-bold">Ajouter un Nouveau Produit</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {message && (
            <div 
              className={`
                p-4 rounded-lg text-center font-semibold 
                ${message.includes("Erreur") 
                  ? "bg-red-100 text-red-700" 
                  : "bg-green-100 text-green-700"
                }
              `}
            >
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="text-gray-400" />
              </div>
              <input
                type="text"
                name="nom_produit"
                placeholder="Nom du Produit"
                value={formData.nom_produit}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="text-gray-400" />
              </div>
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={formData.prix}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 pointer-events-none">
              <Info className="text-gray-400" />
            </div>
            <textarea
              name="description_courte"
              placeholder="Description Courte"
              value={formData.description_courte}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition min-h-[100px]"
            ></textarea>
          </div>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 pointer-events-none">
              <Info className="text-gray-400" />
            </div>
            <textarea
              name="description_complete"
              placeholder="Description-complete"
              value={formData.description_complete}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition min-h-[100px]"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Layers className="text-gray-400" />
              </div>
              <select 
                name="id_categorie" 
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option 
                    key={category.id_categorie}
                    value={category.id_categorie}
                  >
                    {category.nom_categorie}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="text-gray-400" />
              </div>
              <input
                type="text"
                name="origine"
                placeholder="Origine"
                value={formData.origine}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="text-gray-400" />
              </div>
              <input
                type="text"
                name="certification"
                placeholder="Certification"
                value={formData.certification}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="text-gray-400" />
              </div>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Upload className="text-gray-400" />
            </div>
            <input
              type="file"
              name="image_principale"
              onChange={handleImageChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 transition file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`
              w-full p-4 rounded-lg text-white font-bold transition
              ${uploading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }
            `}
          >
            {uploading ? "Ajout en cours..." : "Ajouter le Produit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
