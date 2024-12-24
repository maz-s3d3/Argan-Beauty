import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Truck, Tag, Info } from 'lucide-react';

const DetailCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message,setMessage]=useState("");
  const[id_user,SetId_user]=useState();
    
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    SetId_user(storedUserId);
    console.log(storedUserId)
  }, []); // The empty array ensures this runs only once when the component mounts.
   

  // Validation et gestion des données du produit
  const validateProductData = (productData) => {
    return {
      id: productData.id_produit || null,
      name: productData.nom_produit || 'Produit sans nom',
      shortDescription: productData.description_courte || 'Aucune description disponible',
      fullDescription: productData.description_complete || 'Aucun détail supplémentaire',
      image: productData.image_principale || '/placeholder-image.jpg',
      price: productData.prix > 0 ? productData.prix : null,
      stock: productData.stock || 0,
      origin: productData.origine || 'Origine non spécifiée',
      category: productData.categorie || 'Non catégorisé'
    };
  };

  // Gestion de l'ajout au panier
  const handleAddToCart = async() => {
    if (!product || product.stock === 0) {
        
      return;
    }

    const cartItem = {
      id_user:id_user,
      id_produit: product.id_produit,
    };

    // Logique d'ajout au panier 
    try {
      const response = await fetch("https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/cart.php", {
        method:"POST",
        body:{cartItem}
    })
    
    if(!response.ok){
        const errorData=await response.json();
        setMessage(`Error : ${errorData.error}`)
        return;
    }
    const result= await response.json();
    setMessage(result.massage ||  "Produit ajouté au panier avec succès !")
  } catch(error){
    setMessage("Erreur lors de l'ajout du produit au panier");
    console.error("Erreur lors de l'ajout du produit:", error);
}
}

  // Récupération des données du produit
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
        // Filtrer les données pour trouver le bon produit
        const filteredProduct = data.find(item => item.id_produit === id);
  
        if (!filteredProduct) {
          throw new Error("Aucun produit trouvé avec cet identifiant");
        }
  
        setProduct(validateProductData(filteredProduct));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  

  // État de chargement
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

  // Gestion des erreurs
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 mt-16">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mt-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
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

  // Pas de produit trouvé
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Aucun produit trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link 
        to="/products" 
        className="flex items-center text-green-600 hover:text-green-800 mb-6"
      >
        <ArrowLeft className="mr-2" /> Retour aux produits
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl overflow-hidden mt-14">
        {/* Section Image */}
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

        {/* Section Détails */}
        <div className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg">{product.shortDescription}</p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-green-600">
              {product.price ? `${product.price} €` : 'Prix sur demande'}
            </span>
            
            <span 
              className={`
                px-3 py-1 rounded-full text-sm font-semibold
                ${product.stock > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'}
              `}
            >
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Rupture'}
            </span>
          </div>

          {/* Sélection de quantité */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} 
              className="bg-gray-200 px-3 py-1 rounded"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          {/* Bouton d'ajout au panier */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full 
              text-lg font-semibold transition-all duration-300
              ${product.stock > 0 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            <ShoppingCart size={20} />
            {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
          </button>

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Truck className="mr-2 text-green-600" size={20} />
              Livraison disponible
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 text-green-600" size={20} />
              Catégorie: {product.category}
            </div>
            <div className="flex items-center col-span-2">
              <Info className="mr-2 text-green-600" size={20} />
              Origine: {product.origin}
            </div>
          </div>

          {/* Description complète */}
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              Description Détaillée
            </h2>
            <p className="text-gray-700">{product.fullDescription}</p>
          </div>
        </div>
      <div className='rounded w-44 h-28 bg-red-200 text-red-400 '>
            {error&&<h2 className='text-center'>{message}</h2>
}
            </div>
      </div>
    </div>
  );
}

export default DetailCard;
