// src/components/Header.tsx
export const Header = () => {
    return (
        <header className="bg-gray-800 shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col items-center">
                <div className="text-xl font-bold text-white mb-2">ENZO VANI</div>
                <nav className="space-x-6">
                    <a href="#" className="text-gray-300 hover:text-white">
                        Inicio
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Servicios
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Contacto
                    </a>
                </nav>
            </div>
        </header>

    );
};


