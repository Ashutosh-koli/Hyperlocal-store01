import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CartPage.css'; 

const CartPage = () => {
  const {
    cart,
    userName,
    setUserName,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!userName.trim()) {
      toast.warn("Please enter your name before placing the order.");
      return;
    }

    if (cart.length === 0) {
      toast.info("Your cart is empty.");
      return;
    }

    try {
      const products = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      await axios.post('https://hyperlocal-store01.onrender.com/api/orders', {
        name: userName,
        products,
        total
      });

      clearCart();
      toast.success("Order placed successfully!");
      setTimeout(() => navigate('/order-confirmation'), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place the order. Try again.");
    }
  };

  return (
    <div className="cart-container">
      <ToastContainer />
      <h2 className="cart-title">🛒 Your Cart</h2>

      <ul className="cart-list">
        {cart.map(item => (
          <li key={item._id} className="cart-item">
            <span>{item.name}</span>
            <div className="item-controls">
              <button className="qty-btn" onClick={() => decreaseQuantity(item._id)}>−</button>
              <span className="item-qty">{item.quantity}</span>
              <button className="qty-btn" onClick={() => increaseQuantity(item._id)}>+</button>
            </div>
            <span>₹{item.price} × {item.quantity}</span>
          </li>
        ))}
      </ul>

      <p className="cart-total">Total: ₹{total}</p>

      <input
        type="text"
        className="name-input"
        placeholder="Your Name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />

      <button className="order-button" onClick={handlePlaceOrder}>
        ✅ Place Order
      </button>
    </div>
  );
};

export default CartPage;
