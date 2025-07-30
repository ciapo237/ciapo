import React from 'react';
import MarketplaceHero from '../components/marketplace/Hero';
import ProductList from '../components/marketplace/ProductList';
import CallToAction from '../components/home/CallToAction';

const MarketplacePage: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'Marketplace Agricole | CIAPO COOP-CA';
  }, []);

  return (
    <div>
      <MarketplaceHero />
      <ProductList />
      <CallToAction />
    </div>
  );
};

export default MarketplacePage;