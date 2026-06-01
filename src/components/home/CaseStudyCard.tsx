import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface CaseStudyProps {
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  challenge: string;
  solution: string;
  results: {
    text: string;
    highlight?: boolean;
  }[];
  slug: string;
}
const CaseStudyCard: React.FC<CaseStudyProps> = ({
  title,
  subtitle,
  icon,
  iconBg,
  challenge,
  solution,
  results,
  slug
}) => {
  return <div className="bg-gradient-to-br from-white/10 via-secondary-900/20 to-primary-900/20 backdrop-blur-md rounded-xl overflow-hidden border border-secondary-400/30 hover:border-secondary-400/60 transition-all duration-300 hover:shadow-royal-glow transform hover:scale-105 group">
      <div className="p-6 relative">
        {/* Royal accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 via-primary-500 to-secondary-600"></div>
        
        <div className="flex items-start">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500/20 to-primary-500/20 border border-secondary-400/30 flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <img src={icon} alt={title} className="w-6 h-6 filter brightness-110" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-white group-hover:text-secondary-200 transition-colors">{title}</h3>
            <p className="text-secondary-300 text-sm font-medium">{subtitle}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 border border-red-400/30 mr-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
              </span>
              <span className="text-white font-semibold text-sm">Challenge</span>
            </div>
            <p className="text-gray-300 text-sm pl-7 leading-relaxed">{challenge}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary-500/20 border border-secondary-400/30 mr-2">
                <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full"></span>
              </span>
              <span className="text-white font-semibold text-sm">Royal Solution</span>
            </div>
            <p className="text-gray-300 text-sm pl-7 leading-relaxed">{solution}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-500/20 border border-accent-400/30 mr-2">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
              </span>
              <span className="text-white font-semibold text-sm">Elite Results</span>
            </div>
            <div className="pl-7 space-y-1.5">
              {results.map((result, index) => <div key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-400 mt-1.5 mr-2 shadow-sm"></span>
                  <span className={`text-sm ${result.highlight ? 'text-secondary-300 font-semibold' : 'text-gray-300'}`}>
                    {result.text}
                  </span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-400/30 px-6 py-3 flex justify-end bg-gradient-to-r from-secondary-900/20 to-primary-900/20">
        <Link to={`/case-studies/${slug}`} className="inline-flex items-center text-sm font-semibold text-secondary-300 hover:text-secondary-200 transition-all duration-300 transform hover:scale-105 group-hover:translate-x-1">
          Read Royal Case Study
          <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>;
};
export default CaseStudyCard;