import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { userName } = useCart();

  return (
    <div className="container">
      <h2>Thank you, {userName}!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default OrderConfirmationPage;
