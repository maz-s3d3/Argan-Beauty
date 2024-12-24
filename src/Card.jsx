import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php", {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "1",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg font-semibold text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id_produit}
              className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image_principale || "/placeholder.png"}
                alt={product.nom_produit}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.nom_produit}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {product.description_courte || "No description available."}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-bold">Price:</span> {product.prix} MAD
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Stock:</span> {product.stock}
              </p>
    <Link to={`/ProductDetails/${product.id_produit}`}><button className="w-32 h-8 bg-green-500 rounded-md">View Details</button></Link>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default Card;
