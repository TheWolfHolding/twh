import React from 'react';
import './Page.css';

interface PageProps {
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  backgroundColor: string;
  sectionIndex: number;
  children?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({
  title,
  subtitle,
  description,
  features,
  backgroundColor,
  sectionIndex,
  children
}) => {
  return (
    <section 
      className="page-section"
      style={{ backgroundColor }}
      data-section={sectionIndex}
    >
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{title}</h1>
          {subtitle && <h2 className="page-subtitle">{subtitle}</h2>}
        </div>
        
        <div className="page-body">
          <p className="page-description">{description}</p>
          
          {features.length > 0 && (
            <div className="page-features">
              <h3>Caratteristiche principali:</h3>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {children}
        </div>
      </div>
    </section>
  );
};

export default Page;
