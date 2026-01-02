

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, className }) => (
  <input 
    type="text" 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder} 
    className={`border rounded p-2 w-full ${className}`} 
  />
);
