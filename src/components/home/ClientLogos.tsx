import React from 'react';
interface ClientLogosProps {
  logos: {
    name: string;
    image: string;
    size?: 'small' | 'medium' | 'large';
  }[];
}
const ClientLogos: React.FC<ClientLogosProps> = ({
  logos
}) => {
  return <div className="relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-secondary-600/5 to-primary-600/5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-300/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-300/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100 mb-12">
          Trusted by Industry Leaders Worldwide
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => <div key={index} className={`
                flex items-center justify-center bg-gradient-to-br from-white/10 via-white/5 to-white/10 
                backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:border-accent-300/50 
                transition-all duration-300 hover:shadow-royal-glow hover:scale-105
                ${logo.size === 'large' ? 'col-span-2' : logo.size === 'medium' ? 'col-span-1 md:col-span-1' : ''}
              `}>
              <img src={logo.image} alt={logo.name} className="h-10 md:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-all duration-300" />
            </div>)}
        </div>
      </div>
    </div>;
};
export default ClientLogos;