import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { userName } = useCart();

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2 className="confirmation-title">🎉 Thank you, {userName}!</h2>
        <p className="confirmation-message">
          Your order has been placed successfully.
        </p>
        <Link to="/" className="back-home-link">🏠 Go Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
