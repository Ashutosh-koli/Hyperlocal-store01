import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const StorePage = () => {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${storeId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [storeId]);

  return (
    <div className="container">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(p => (
          <li key={p._id}>
            {p.name} ₹{p.price}
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <Link to="/cart">View Cart</Link>
    </div>
  );
};

export default StorePage;
