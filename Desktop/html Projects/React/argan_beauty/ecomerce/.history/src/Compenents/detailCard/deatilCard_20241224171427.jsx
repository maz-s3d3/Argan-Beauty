import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const DetailCard = ({ handleAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const validateProductData = useMemo(() => (data) => ({
    id: data.id_produit || null,
    name: data.nom_produit || 'Produit sans nom',
    shortDescription: data.description_courte || 'Aucune description',
    fullDescription: data.description_complete || 'Aucun détail',
    image: data.image_principale || '/placeholder-image.jpg',
    price: data.prix > 0 ? data.prix : null,
    stock: data.stock || 0,
  }), []);

  useEffect(() => {
    fetch('https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php', {
      headers: {
        'ngrok-skip-browser-warning': '1',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setProduct(validateProductData(data[0]));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [validateProductData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error || 'Produit non trouvé'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link to="/card" className="flex items-center text-green-600 mb-6">
        <ArrowLeft className="mr-2" /> Retour
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-96 object-cover rounded-xl"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />

        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold text-green-800">{product.name}</h1>
          <p className="text-gray-600">{product.shortDescription}</p>
          <p className="text-gray-600 font-bold">{product.fullDescription}</p>

          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-green-600">
              {product.price ? `${product.price} €` : 'Prix sur demande'}
            </span>
            <span className={`px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Rupture de stock'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <button 
            onClick={() => handleAddToCart({ ...product, quantity })}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <ShoppingCart className="mr-3" /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;