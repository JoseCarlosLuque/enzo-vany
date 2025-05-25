import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">Acerca de nosotros</Link>
        <Link to="/contact">Contacto</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
