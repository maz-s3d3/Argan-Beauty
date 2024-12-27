import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailCard = ({ handlClick }) => {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupérer les détails du produit
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/products.php?id=${id}`
        );
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!product) return <p>Produit introuvable</p>;

  return (
    <div className="detail-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Prix : ${product.price}</p>
      <p>Stock disponible : {product.stock}</p>
      <button onClick={() => handlClick(product)}>Ajouter au panier</button>
    </div>
  );
};

export default DetailCard;
