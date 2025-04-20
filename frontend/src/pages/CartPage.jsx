import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const { cart, userName, setUserName, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const products = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    await axios.post('http://localhost:3000/api/orders', {
      name: userName,
      products,
      total
    });

    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item._id}>
            {item.name} - ₹{item.price} × {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ₹{total}</p>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CartPage;
