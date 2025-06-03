import { useCart } from '../context/CartContext';
import CheckoutButton from '../components/button_checkout';

const Cart: React.FC = () => {
  const { cart, updateQuantity } = useCart(); // ✅ vamos a asumir que después agregaremos updateQuantity al contexto

  console.log("Contenido del carrito:", cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const itemsForStripe = cart.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tu Carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center border p-4 rounded shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700">
                  Precio unitario: ${item.price.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center">
                  <label className="mr-2">Cantidad:</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-20 border rounded px-2 py-1"
                  />
                </div>
                <p className="text-gray-700 mt-1">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>
          <div className="text-right mt-4">
            <CheckoutButton items={itemsForStripe} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;