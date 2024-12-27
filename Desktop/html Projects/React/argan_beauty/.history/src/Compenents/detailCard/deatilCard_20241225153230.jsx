import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'react-icons/fa';

const DetailCard = () => {
  const [product, setProduct] = useState({
    id: null,
    name: 'Produit non disponible',
    shortDescription: 'Pas d\'informations disponibles',
    fullDescription: '',
    image: '/placeholder-image.jpg',
    price: 0,
    stock: 0,
    origin: '',
    category: '',
  });
  const [id_cart, SetId_cart] = useState(null);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const id = 1; // Replace with dynamic ID if needed

  useEffect(() => {
    // Load cart ID from localStorage
    const storedCartId = localStorage.getItem('id_cart');
    SetId_cart(storedCartId);
  }, []);

  useEffect(() => {
    // Fetch product data
    fetch(`https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Erreur lors de la récupération des données:', error));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) {
      setMessage('Produit en rupture de stock.');
      return;
    }

    if (quantity < 1 || quantity > product.stock) {
      setMessage('Quantité invalide.');
      return;
    }

    setIsAddingToCart(true);

    try {
      const response = await fetch('https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php?action=add_to_cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_cart,
          id_product: product.id,
          quantity,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Produit ajouté au panier avec succès !');
      } else {
        setMessage(`Erreur : ${result.error}`);
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="w-full max-h-96 object-cover rounded-xl mb-4"
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg';
        }}
      />

      {/* Product Details */}
      <h1 className="text-xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.shortDescription}</p>
      <p className="text-gray-800 mb-4">{product.fullDescription}</p>
      <p className="text-sm text-gray-500 mb-2">Origine : {product.origin}</p>
      <p className="text-sm text-gray-500 mb-4">Catégorie : {product.category}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">Prix : {product.price} MAD</p>

      {/* Quantity Selector */}
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2 text-gray-700">Quantité :</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max={product.stock}
          className="w-16 px-2 py-1 border rounded"
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart || product.stock === 0}
        className={`w-full flex items-center justify-center px-4 py-2 text-white rounded-lg ${
          product.stock === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isAddingToCart ? (
          <span className="loader">Ajout en cours...</span>
        ) : (
          <>
            <ShoppingCart size={20} className="mr-2" />
            {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
          </>
        )}
      </button>

      {/* Message Display */}
      {message && (
        <div className="mt-4 rounded bg-red-100 text-red-800 p-3 text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default DetailCard;
