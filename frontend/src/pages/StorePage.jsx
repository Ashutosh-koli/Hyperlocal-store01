import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StorePage.css'; 

const StorePage = () => {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://hyperlocal-store01.onrender.com/api/products/${storeId}`)
      .then(res => {
        setProducts(res.data);
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load products");
        setLoading(false); 
      });
  }, [storeId]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="store-container">
      <ToastContainer />
      <h2 className="store-title">🛒 Products Available</h2>
      {products.length === 0 ? (
        <p>No products available in this store.</p>
      ) : (
        <ul className="product-list">
          {products.map(p => (
            <li key={p._id} className="product-item">
              <div className="product-info">
                <span className="product-name">{p.name}</span>
                <span className="product-price">₹{p.price}</span>
              </div>
              <button className="add-btn" onClick={() => handleAddToCart(p)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/cart" className="cart-link">🛒 View Cart</Link>
    </div>
  );
};

export default StorePage;
