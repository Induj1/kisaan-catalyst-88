import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, CheckCircle, MessageSquare, Search, ShoppingCart, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [weather, setWeather] = useState({
    temperature: 25,
    condition: "Sunny",
    humidity: 60,
    windSpeed: 10,
  });

  const [marketPrices, setMarketPrices] = useState([
    { crop: "Wheat", price: 2000, unit: "₹/Quintal" },
    { crop: "Rice", price: 2500, unit: "₹/Quintal" },
    { crop: "Corn", price: 1800, unit: "₹/Quintal" },
  ]);

  const [expertAdvice, setExpertAdvice] = useState([
    {
      expert: "Dr. Sharma",
      advice: "Use organic fertilizers for better yield.",
    },
    {
      expert: "Mr. Patel",
      advice: "Monitor soil moisture regularly.",
    },
  ]);

  const { translate } = useLanguage();

  useEffect(() => {
    // Simulate fetching weather data
    setTimeout(() => {
      setWeather({
        temperature: 28,
        condition: "Cloudy",
        humidity: 75,
        windSpeed: 15,
      });
    }, 2000);

    // Simulate fetching market prices
    setTimeout(() => {
      setMarketPrices([
        { crop: "Wheat", price: 2100, unit: "₹/Quintal" },
        { crop: "Rice", price: 2600, unit: "₹/Quintal" },
        { crop: "Corn", price: 1900, unit: "₹/Quintal" },
      ]);
    }, 3000);

    // Simulate fetching expert advice
    setTimeout(() => {
      setExpertAdvice([
        {
          expert: "Dr. Sharma",
          advice: "Use organic fertilizers for better yield and soil health.",
        },
        {
          expert: "Mr. Patel",
          advice: "Monitor soil moisture regularly to prevent water stress.",
        },
      ]);
    }, 4000);
  }, []);
  
  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{translate('welcome')}</h1>
          <p className="text-gray-600">
            {translate('home')} {translate('features')} {translate('demo')} {translate('government')}
          </p>
          <div className="mt-6">
            <Button>{translate('signIn')}</Button>
          </div>
        </section>

        {/* Weather Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{translate('weather')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Temperature</h3>
              <p>{weather.temperature}°C</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Condition</h3>
              <p>{weather.condition}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Humidity</h3>
              <p>{weather.humidity}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Wind Speed</h3>
              <p>{weather.windSpeed} km/h</p>
            </div>
          </div>
        </section>

        {/* Market Prices */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{translate('marketplace')}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Crop
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {marketPrices.map((item, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {item.crop}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {item.price}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Expert Advice */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{translate('askExpert')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertAdvice.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
              >
                <h3 className="font-semibold">{item.expert}</h3>
                <p>{item.advice}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default Index;
