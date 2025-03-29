
import React from 'react';
import FeatureDetail from '@/components/FeatureDetail';
import { CreditCard } from 'lucide-react';

const MarketplaceDetail = () => {
  return (
    <FeatureDetail
      title="Credit-Based Marketplace"
      description="Buy seeds, fertilizers, and equipment using farm credits"
      icon={CreditCard}
      color="bg-blue-50"
      iconColor="bg-blue-500"
      benefits={[
        "Trade using farm credits without cash payment",
        "Build credit history to qualify for larger agricultural loans",
        "Connect directly with suppliers to eliminate middlemen",
        "Seasonal payment plans aligned with harvest cycles"
      ]}
      features={[
        "Digital credit system with flexible earning/spending options",
        "Verified supplier network with quality guarantees",
        "Buy and sell products using farm credits",
        "Purchase history tracking and receipt management",
        "Integration with loan applications for seamless financing"
      ]}
      demoLink="/marketplace"
    />
  );
};

export default MarketplaceDetail;
