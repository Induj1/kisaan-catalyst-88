
import React from 'react';
import FeatureDetail from '@/components/FeatureDetail';
import { Cloud } from 'lucide-react';

const WeatherDetail = () => {
  return (
    <FeatureDetail
      title="Weather & Mandi Updates"
      description="Real-time weather and market price alerts"
      icon={Cloud}
      color="bg-yellow-50"
      iconColor="bg-yellow-500"
      benefits={[
        "Plan farm activities based on accurate weather forecasts",
        "Receive alerts about extreme weather conditions",
        "Track regional market prices to sell at optimal times",
        "Access historical weather data for seasonal planning"
      ]}
      features={[
        "Hyperlocal weather predictions using multiple data sources",
        "SMS alerts for critical weather events",
        "Daily, weekly, and seasonal forecasts",
        "Real-time mandi (market) price updates for major crops",
        "Historical price trends and prediction tools"
      ]}
      demoLink="/weather"
    />
  );
};

export default WeatherDetail;
