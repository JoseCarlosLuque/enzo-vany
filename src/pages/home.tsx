import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/card";
import { BACKEND_URL } from "../config";
import { Button } from "../components/button";
import { Input } from "../components/input";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubscribe = async () => {
    await fetch(`${BACKEND_URL}}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("¡Te has suscrito! Gracias por formar parte del universo Enzo Vani.");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 font-serif">
      {/* Mensaje persuasivo */}

      <div
        className="relative bg-cover bg-center h-96 rounded-xl shadow-lg mb-10"
        style={{ backgroundImage: "url('/hero-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-30 rounded-xl flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            Enzo Vani
          </h1>
          <p className="text-lg md:text-xl max-w-xl">
            Donde la elegancia atemporal se encuentra con la artesanía de lujo.
          </p>
        </div>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Descubre el legado de Enzo Vani
        </h1>
        <p className="text-lg text-gray-700">
          Regístrate con tu correo electrónico y sé el primero en acceder a
          nuestras colecciones exclusivas, inspiradas en la tradición y
          confeccionadas con la mejor lana Merina española.
        </p>
      </div>

      {/* Sección de suscripción */}
      <div className="bg-gray-100 rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Únete a nuestra lista exclusiva
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <Input
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Button
            onClick={handleSubscribe}
            className="bg-gray-800 hover:bg-blue-800 transition px-6 py-2 rounded text-white"
          >
            Suscribirme
          </Button>
        </div>
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent
              id={product.id}
              title={product.name}
              price={product.price}
              stock={product.stock}
              image={product.image}
              //onBuy={() => alert(`Has comprado ${product.name}`)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
