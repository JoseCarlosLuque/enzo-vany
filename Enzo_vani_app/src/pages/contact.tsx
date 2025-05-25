

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 font-serif">
      <h1 className="text-4xl font-bold mb-20 mt-16 text-center">Contacto</h1>

      <p className="mb-4 text-lg text-gray-700">
        En <span className="italic">Enzo Vani</span> valoramos la cercanía con nuestros clientes. Si tienes cualquier consulta, sugerencia o simplemente deseas conocer más sobre nuestra colección, no dudes en contactarnos.
      </p>

      <div className="mb-4 text-lg text-gray-700">
        <p className="mb-1">
          <span className="font-semibold">Teléfono:</span> +34 912 345 678
        </p>
        <p className="mb-1">
          <span className="font-semibold">Correo electrónico:</span> contacto@enzovani.com
        </p>
        <p className="mb-1">
          <span className="font-semibold">Dirección:</span> Calle de Serrano, 21, Madrid, España
        </p>
      </div>

      <div className="mb-4 text-lg text-gray-700">
        <p className="font-semibold mb-2">Síguenos en redes sociales:</p>
        <ul className="list-disc list-inside">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Instagram: @enzovani_official
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Facebook: Enzo Vani Official
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              LinkedIn: Enzo Vani
            </a>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 italic text-center">
        Nuestro equipo estará encantado de atenderte personalmente.
      </p>
    </div>
  );
};

export default Contact;
