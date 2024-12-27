import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, AlertCircle, Loader } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Cart = ({ removeFromCart, isDarkMode }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRemoving, setIsRemoving] = useState(null);
  const [id_cart, setIdCart] = useState(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem('id_cart');
    setIdCart(storedCartId);
  }, []);

  useEffect(() => {
    if (!id_cart) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(
          `https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php?id_cart=${id_cart}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': true
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur lors du chargement du panier (${response.status})`);
        }

        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [id_cart]);

  const handleRemoveFromCart = async (itemId) => {
    setIsRemoving(itemId);
    try {
      await removeFromCart(itemId);
      setItems(items.filter(item => item.id_cart_item !== itemId));
    } catch (err) {
      setError("Erreur lors de la suppression de l'article");
    } finally {
      setIsRemoving(null);
    }
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
          <ShoppingCart size={48} className="opacity-50" />
          <p className="mt-4 text-lg">Votre panier est vide</p>
          <Link
            to="/"
            className={`mt-6 px-6 py-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-green-600 hover:bg-green-500 text-white' 
                : 'bg-green-100 hover:bg-green-200 text-green-800'
            }`}
          >
            Continuer vos achats
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id_cart_item}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-all ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.quantity} × {item.price.toFixed(2)} €
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold">
                  {(item.quantity * item.price).toFixed(2)} €
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id_cart_item)}
                  disabled={isRemoving === item.id_cart_item}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-red-600 hover:bg-red-500 text-white disabled:bg-red-800'
                      : 'bg-red-100 hover:bg-red-200 text-red-800 disabled:bg-red-50'
                  }`}
                >
                  {isRemoving === item.id_cart_item ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    'Supprimer'
                  )}
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold flex justify-between">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </h2>
            <button
              className={`w-full mt-4 px-6 py-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              Passer à la caisse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;