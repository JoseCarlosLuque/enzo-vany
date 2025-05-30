import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                <p className="text-gray-700">Precio: ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
