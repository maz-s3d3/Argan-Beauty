import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Loader } from 'lucide-react';

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

  // Fetch cart items when id_cart is set
  useEffect(() => {
    if (id_cart) { // Ensure id_cart is available before making the request
        fetch(`https://e2c7-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php?id_cart=${id_cart}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setItems(data);
        })
        .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
            console.log(error)
        });
    }
}, [id_cart,items,error]); // Fetch data whenever id_cart or items changes




  const handleDelete = async (id_produit) => {
    setIsRemoving(id_produit);
    const id_cart = localStorage.getItem('id_cart');
  
    if (!id_cart) {
      console.error('Cart ID is missing.');
      return;
    }
  
    fetch(`https://e2c7-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": true
      },
      body: new URLSearchParams({
        id_cart: id_cart,
        id_produit: id_produit
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Update the state to remove the deleted item
        setItems((prevItems) => prevItems.filter((item) => item.id_produit !== id_produit));
      })
      .catch((error) => {
        console.error("Failed to remove item:", error);
      })
      .finally(()=>{setIsRemoving(null)})
  }

  // Rest of the component remains the same...
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

      { items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <ShoppingCart className="w-12 h-12 opacity-50" />
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

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id_cart_item}
            className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-all ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <Link to={`/detailcard/${item.id}`}><div className="flex items-center gap-4">
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
            </div></Link>

            <div className="flex items-center gap-4">
              <p className="font-semibold">
                {(item.quantity * item.price).toFixed(2)} €
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={isRemoving === item.id}
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

        {items.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <div className="text-xl font-bold flex justify-between">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
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
        )}
      </div>
    </div>
  );
};

export default Cart;
