
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}>
    {children}
  </button>
);