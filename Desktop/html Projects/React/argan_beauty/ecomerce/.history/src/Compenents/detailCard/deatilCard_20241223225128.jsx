import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Truck, Tag, Info } from 'lucide-react';

// Messages d'état centralisés
const MESSAGES = {
  noProductId: "Aucun identifiant de produit n'a été fourni.",
  loadingError: "Erreur lors du chargement du produit.",
  noProductFound: "Aucun produit trouvé avec cet identifiant.",
  outOfStock: "Rupture de stock.",
  addToCartSuccess: (quantity, productName) => `${quantity} ${productName} ajouté(s) au panier.`,
  addToCartError: "Erreur lors de l'ajout au panier.",
};

const DetailCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Validation des données du produit (Memoized for performance)
  const validateProductData = useMemo(() => (productData) => ({
    id: productData.id_produit || null,
    name: productData.nom_produit || 'Produit sans nom',
    shortDescription: productData.description_courte || 'Aucune description disponible',
    fullDescription: productData.description_complete || 'Aucun détail supplémentaire',
    image: productData.image_principale || '/placeholder-image.jpg',
    price: productData.prix > 0 ? productData.prix : null,
    stock: productData.stock || 0,
    origin: productData.origine || 'Origine non spécifiée',
    category: productData.categorie || 'Non catégorisé',
  }), []);

  // Ajout au panier
  const handleAddToCart = () => {
    if (!product || product.stock === 0) {
      alert(MESSAGES.outOfStock);
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    };

    try {
      // Ajouter le produit au panier local (localStorage)
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProductIndex = cart.findIndex(item => item.id === cartItem.id);

      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Envoyer une requête POST au backend pour enregistrer l'ajout au panier
      fetch('https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(MESSAGES.addToCartSuccess(quantity, product.name));
          } else {
            alert(MESSAGES.addToCartError);
          }
        })
        .catch((error) => {
          console.error(MESSAGES.addToCartError, error);
          alert(MESSAGES.addToCartError);
        });
    } catch (error) {
      console.error(MESSAGES.addToCartError, error);
      alert(MESSAGES.addToCartError);
    }
  };

  useEffect(() => {
    fetch(`https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php?id=${id}`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '1',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${MESSAGES.loadingError}: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredProduct = data.find(item => item.id_produit === id);

        if (!filteredProduct) {
          throw new Error(MESSAGES.noProductFound);
        }

        setProduct(validateProductData(filteredProduct));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, validateProductData]);

  if (loading) {
    return (
      <div className="container flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 font-semibold">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 mt-16">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mt-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-red-800 mb-6">{error}</p>
          <Link 
            to="/products" 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{MESSAGES.noProductFound}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link 
        to="/products" 
        className="flex items-center text-green-600 hover:text-green-800 mb-6"
        aria-label="Retour aux produits"
      >
        <ArrowLeft className="mr-2" /> Retour aux produits
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl overflow-hidden mt-14">
        <div className="p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-96 object-cover rounded-xl"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>

        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold text-green-800">{product.name}</h1>
          <p className="text-gray-600">{product.shortDescription}</p>

          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-green-600">
              {product.price ? `${product.price} €` : 'Prix sur demande'}
            </span>
            <span 
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock > 0 ? `Stock: ${product.stock}` : MESSAGES.outOfStock}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="bg-gray-200 px-3 py-1 rounded"
              aria-label="Réduire la quantité"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className="bg-gray-200 px-3 py-1 rounded"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>

          <button 
            onClick={handleAddToCart} 
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="mr-3" /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
