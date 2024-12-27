import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Truck, Tag, Info } from 'lucide-react';

const DetailCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [id_cart, setIdCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartId = localStorage.getItem('id_cart');
    setIdCart(storedCartId || null);
  }, []);

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;

    const cartItem = {
      id_cart,
      id_produit: product.id,
      quantity,
    };

    try {
      const response = await fetch('https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Erreur : ${errorData.error}`);
        return;
      }

      const result = await response.json();
      setMessage(result.message || 'Produit ajouté au panier avec succès !');
      setCartCount((prev) => prev + 1); // Incrémente le badge de notification
    } catch (error) {
      setMessage('Erreur lors de l\'ajout du produit au panier');
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Aucun identifiant de produit n'a été fourni");
      setLoading(false);
      return;
    }

    fetch(`https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/api.php?id=${id}`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '1',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur de chargement: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredProduct = data.find((item) => item.id_produit === id);

        if (!filteredProduct) {
          throw new Error("Aucun produit trouvé avec cet identifiant");
        }

        setProduct({
          id: filteredProduct.id_produit,
          name: filteredProduct.nom_produit || 'Produit sans nom',
          price: filteredProduct.prix || 0,
          stock: filteredProduct.stock || 0,
          image: filteredProduct.image_principale || '/placeholder-image.jpg',
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Aucun produit trouvé</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Prix: {product.price} €</p>
      <button onClick={handleAddToCart} disabled={product.stock === 0}>
        Ajouter au panier {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DetailCard;
