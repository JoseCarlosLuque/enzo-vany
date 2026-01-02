// components/FancyCard.tsx
import { useCart } from '../context/CartContext';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 font-serif hover:shadow-xl transition">
      {children}
    </div>
  );
};

export const CardContent: React.FC<{
  title: string;
  price: number;
  stock: number;
  image: string;
  id: string;
}> = ({ title, price, stock, image, id }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      stock,
      image,
    });
    alert(`Has añadido ${title} al carrito`);
  };

  return (
    <div>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-1">Precio: ${price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4">Stock: {stock}</p>
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Añadir al carrito
      </button>
    </div>
  );
};