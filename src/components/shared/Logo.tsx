import React from 'react';
import { Leaf } from 'lucide-react';
import logo from '../../assets/CIAPO.png'

interface LogoProps {
  white?: boolean;
}

const Logo: React.FC<LogoProps> = ({ white = false }) => {
  return (
    <div className={`flex items-center justify-center w-12 h-12 rounded-full `}>
      <img src={logo} alt="Icône" className="w-full h-full object-cover" />
      {/* <Leaf size={20} className="text-white" /> */}
    </div>
  );
};

export default Logo;