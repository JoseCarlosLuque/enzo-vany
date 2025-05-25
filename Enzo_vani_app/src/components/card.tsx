// components/FancyCard.tsx
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
  onBuy: () => void;
}> = ({ title, price, stock, image, onBuy }) => {
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
        onClick={onBuy}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Comprar
      </button>
    </div>
  );
};