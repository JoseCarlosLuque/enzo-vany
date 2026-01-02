import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    image: ""
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BACKEND_URL}}/products`)
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  const handleUpdate = async (product: Product) => {
    await fetch(`${BACKEND_URL}/admin/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image
      })
    });
    alert("Producto actualizado");
  };

  const handleDelete = async (productId: string) => {
    await fetch(`${BACKEND_URL}/admin/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert("Producto eliminado");
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleAdd = async () => {
    const res = await fetch(`${BACKEND_URL}/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      const data = await res.json();
      setProducts([...products, { ...newProduct, id: data.product_id }]);
      setNewProduct({ name: "", price: 0, stock: 0, image: "" });
      alert("Producto añadido");
    } else {
      alert("Error al añadir producto");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

      {/* Formulario para añadir nuevo producto */}
      <div className="mb-6 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Añadir nuevo producto</h2>
        <div className="grid grid-cols-4 gap-2">
          <input
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border rounded p-1"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
            }
            className="border rounded p-1"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })
            }
            className="border rounded p-1"
          />
          <input
            placeholder="Ruta imagen"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border rounded p-1"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
        >
          Añadir Producto
        </button>
      </div>

      {/* Tabla de productos */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Imagen</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Precio</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Ruta Imagen</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="border px-2 py-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  value={product.name}
                  onChange={(e) =>
                    setProducts(products.map(p => p.id === product.id ? { ...p, name: e.target.value } : p))
                  }
                  className="border rounded p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProducts(products.map(p => p.id === product.id ? { ...p, price: parseFloat(e.target.value) } : p))
                  }
                  className="border rounded p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProducts(products.map(p => p.id === product.id ? { ...p, stock: parseInt(e.target.value) } : p))
                  }
                  className="border rounded p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  value={product.image}
                  onChange={(e) =>
                    setProducts(products.map(p => p.id === product.id ? { ...p, image: e.target.value } : p))
                  }
                  className="border rounded p-1 w-full"
                />
              </td>
              <td className="border px-2 py-1 flex space-x-2">
                <button
                  onClick={() => handleUpdate(product)}
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;