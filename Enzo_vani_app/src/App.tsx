import { useEffect, useState } from 'react';
import { Card, CardContent } from './components/card';
import { Button } from './components/button';
import { Input } from './components/input';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSubscribe = async () => {
    await fetch('http://localhost:8000/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    alert('¡Te has suscrito!');
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-500 text-white p-4">
        ¡Tailwind está funcionando!
    </div>
      <div className="col-span-3 mb-4">
        <Input 
          placeholder="Tu correo electrónico" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <Button onClick={handleSubscribe} className="mt-2">Suscribirme</Button>
      </div>
      {products.map(product => (
        <Card key={product.id}>
          <CardContent>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default App;
