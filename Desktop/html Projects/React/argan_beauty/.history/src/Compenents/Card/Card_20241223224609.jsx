import React, { useEffect, useState, useCallback } from 'react';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async (url, setDataFunc, errorMessage) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '1',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setDataFunc(data);
    } catch (err) {
      console.error(errorMessage, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchData(
        'https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php',
        (data) => {
          const uniqueProducts = data
            .filter(
              (product, index, self) =>
                index === self.findIndex((p) => p.id_produit === product.id_produit)
            )
            .sort((a, b) => b.stock - a.stock);
          setProducts(uniqueProducts);
        },
        'Erreur lors du chargement des produits'
      );
    };

    loadProducts();
  }, [fetchData]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/categorie.php', {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': '1',
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        
        // Log détaillé
        console.log('Données des catégories reçues:', data);
  
        if (Array.isArray(data)) {
          setCategories([
            { id_categorie: 'All', nom_categorie: 'Toutes les catégories' }, 
            ...data
          ]);
        } else if (data.error) {
          console.error('Erreur lors du chargement des catégories:', data.error);
          setError(data.error);
        } else {
          console.error('Format de données inattendu:', data);
        }
      } catch (error) {
        console.error('Erreur de chargement des catégories:', error);
        setError(error.message);
      }
    };
  
    loadCategories();
  }, []);
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'All' || product.id_categorie === selectedCategory) &&
      (searchTerm === '' ||
        product.nom_produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description_courte?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="container flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mb-4"></div>
          <p className="text-green-600 font-semibold">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
          <p className="text-red-800 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-9">
      <div className="text-center mt-19">
      <h1 className="text-4xl font-extrabold text-green-800 mt-8">Nos Produits</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez notre gamme de produits soigneusement sélectionnés pour votre bien-être.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white shadow-md w-full md:w-auto"
        >
          {categories.map((category) => (
            <option key={category.id_categorie} value={category.id_categorie}>
              {category.nom_categorie}
            </option>
          ))}
        </select>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-white shadow-md pl-10"
          />
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id_produit}
              className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
            >
              <div className="relative">
                <img
                  src={product.image_principale || '/placeholder-image.jpg'}
                  alt={product.nom_produit}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Bientôt épuisé
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-green-800 truncate">{product.nom_produit}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Rupture'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">
                  {product.description_courte || 'Aucune description disponible'}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    {product.prix > 0 ? `${product.prix} $` : 'Prix non défini'}
                  </span>
                  <Link
                    to={`/detailcard/${product.id_produit}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                      product.stock > 0
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    Voir les détails
                  </Link>
                </div>

                {product.origine && (
                  <div className="text-sm text-gray-500 mt-2 flex items-center">
                    <Star size={14} className="mr-2 text-yellow-500" />
                    {product.origine}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">Aucun produit disponible correspondant à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
