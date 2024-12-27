import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';

const Cart = ({ removeFromCart, isDarkMode }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id_cart, setIdCart] = useState(null);

    // Get id_cart from localStorage on component mount
    useEffect(() => {
        const storedCartId = localStorage.getItem('id_cart');
        setIdCart(storedCartId); 
    }, []); // This runs once when the component is mounted

    // Fetch cart items when id_cart is set
    useEffect(() => {
        if (id_cart) { // Ensure id_cart is available before making the request
            fetch(`https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php?id_cart=${id_cart}`, {
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
            });
        }
    }, [id_cart]); // Fetch data whenever id_cart changes

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <motion.div
            className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : items.length === 0 ? (
                <motion.div
                    className="flex flex-col items-center justify-center h-64"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ShoppingCart size={48} />
                    <p className="mt-4 text-lg">Votre panier est vide.</p>
                    <Link
                        to="/"
                        className={`mt-6 px-6 py-3 rounded-lg ${
                            isDarkMode ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                    >
                        Continuer vos achats
                    </Link>
                </motion.div>
            ) : (
                <div className="space-y-6">
                    {items.map((item) => (
                        <motion.div
                            key={item.id_cart_item}
                            className="flex items-center justify-between p-4 rounded-lg shadow-md"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} × ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-semibold">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => removeFromCart(item.id_cart_item)}
                                    className={`px-4 py-2 rounded-lg ${
                                        isDarkMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-100 text-red-800 hover:bg-red-200'
                                    }`}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t pt-6 mt-6">
                        <h2 className="text-xl font-bold flex justify-between">
                            <span>Total :</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </h2>
                        <button
                            className={`w-full mt-4 px-6 py-3 rounded-lg ${
                                isDarkMode
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }`}
                        >
                            Passer à la caisse
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;
