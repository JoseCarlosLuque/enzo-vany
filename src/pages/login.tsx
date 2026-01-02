import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Login: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url =
        mode === "login"
          ? `${BACKEND_URL}/login`
          : `${BACKEND_URL}/register`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":
            mode === "login"
              ? "application/x-www-form-urlencoded"
              : "application/json",
        },
        body:
          mode === "login"
            ? new URLSearchParams({
                username: email,
                password: password,
              })
            : JSON.stringify({
                email: email,
                password: password,
              }),
      });

      if (!res.ok) throw new Error(`${mode} fallido`);

      const data = await res.json();

      if (mode === "login") {
        localStorage.setItem("token", data.access_token);

        const meRes = await fetch(`${BACKEND_URL}/me`, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        if (!meRes.ok) throw new Error("No se pudo obtener el usuario");

        const meData = await meRes.json();
        localStorage.setItem("role", meData.role); // guardamos el rol

        alert(`¡Login exitoso como ${meData.role}!`);
        navigate("/");
      } else {
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setMode("login");
      }
    } catch (err) {
      alert(`Error al ${mode === "login" ? "iniciar sesión" : "registrarse"}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "login" ? "Iniciar sesión" : "Registrarse"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </button>
      </form>

      <div className="mt-4 text-center">
        {mode === "login" ? (
          <p>
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => setMode("register")}
              className="text-blue-600 hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        ) : (
          <p>
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-blue-600 hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
