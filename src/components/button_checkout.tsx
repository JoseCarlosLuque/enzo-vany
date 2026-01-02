import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { BACKEND_URL , STRIPE_KEY } from '@/config';


const stripePromise = loadStripe(STRIPE_KEY); 

interface CheckoutButtonProps {
  items: { name: string; price: number; quantity: number }[];
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ items }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      alert('Stripe no se pudo inicializar.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creando sesión de pago.');
      }
    } catch (error) {
      console.error(error);
      alert('Error durante el proceso de pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {loading ? 'Procesando...' : 'Pagar con Stripe'}
    </button>
  );
};

export default CheckoutButton;