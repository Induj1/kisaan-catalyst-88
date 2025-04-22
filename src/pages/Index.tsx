
import PageLayout from "@/components/PageLayout";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Users, BookOpen, Search, Image, Home, Settings, Info } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=1400&q=80"; // placeholder: Indian farmers/cattle

const featureList = [
  {
    icon: Home,
    title: "Personalized Dashboard",
    desc: "A single page for all your farm insights: weather, sensors, tasks, prices, and updates.",
  },
  {
    icon: Search,
    title: "Market Intelligence",
    desc: "Get daily crop prices & trends from the nearest mandi, all in your language.",
  },
  {
    icon: BookOpen,
    title: "Ask an Expert",
    desc: "Connect with agri-experts for advice and AI-powered crop guidance, right from your dashboard.",
  },
  {
    icon: Calendar,
    title: "Crop Calendar",
    desc: "Visualize, plan, and track each stage of your agricultural cycle.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Share experiences, troubleshoot farm issues, and stay connected with local farmers.",
  },
  {
    icon: Settings,
    title: "Smart Automation",
    desc: "Integrate IoT sensors for soil, weather, and livestock data, automatically tracked.",
  },
  {
    icon: Info,
    title: "Govt. Schemes",
    desc: "Easily access current government schemes for agriculture and farming.",
  },
];

const farmerImages = [
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80"
];

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
      {/* Hero Section */}
      <section
        className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col justify-center items-center"
        style={{
          background: `linear-gradient(75deg, rgba(22,5,12,0.60) 0%, rgba(22,96,63,0.6) 100%), url(${heroImage}) center/cover no-repeat`
        }}
      >
        {/* Overlay text */}
        <div className="z-10 text-white text-center px-4 max-w-2xl mx-auto py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-yellow-300 via-primary to-orange-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
            KisaanMitra
          </h1>
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold animate-fade-in delay-200">
            Empowering Indian Farmers with Smart Tools, Data & Community.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/90">
            Your digital companion for every step of the farming journey—crop planning, expert guidance, local market prices, and real-time weather.
          </p>
        </div>
        {/* Farmer Images Gallery */}
        <div className="z-20 mt-10 flex gap-4 justify-center animate-fade-in delay-500">
          {farmerImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="Indian farmer"
              className="rounded-xl border-4 border-white shadow-xl w-28 h-28 sm:w-32 sm:h-32 object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          ))}
        </div>
        {/* Fancy overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Features Overview Section */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-[#fff7ed] via-[#d3e4fd]/40 to-[#dafdf9]/70 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary mb-8 animate-fade-in">
            Explore KisaanMitra’s Features
          </h2>
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-5xl mx-auto">
            {featureList.map((f, idx) => (
              <div
                key={f.title}
                className="glass-morphism rounded-2xl p-6 border shadow-xl flex flex-col items-center animate-fade-in"
                style={{
                  animationDelay: `${100 * idx}ms`
                } as any}
              >
                <div className={`mb-4 p-4 rounded-full bg-gradient-to-br from-yellow-200 via-orange-100 to-primary shadow`}>
                  <f.icon size={36} className="text-primary drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary">{f.title}</h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 'Current Insights' Section */}
      <section className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Card */}
        <div className="rounded-2xl glass-morphism p-6 shadow-md bg-white/80 dark:bg-gray-800/80 border backdrop-blur-md flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
            alt="Weather"
            className="w-14 h-14 mb-3"
            loading="lazy"
          />
          <h3 className="font-medium text-lg">Weather Update</h3>
          <div className="flex flex-wrap justify-center gap-2 text-sm mt-2 text-gray-700 dark:text-gray-200">
            <span className="font-semibold">🌡 {weather.temperature}°C, {weather.condition}</span>
            <span>| 💧 Humidity: {weather.humidity}% | 💨 {weather.windSpeed} km/h</span>
          </div>
        </div>
        {/* Market Prices Card */}
        <div className="rounded-2xl glass-morphism p-6 shadow-md bg-white/80 dark:bg-gray-800/80 border backdrop-blur-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3176/3176291.png"
            alt="Market"
            className="w-14 h-14 mb-3 mx-auto"
            loading="lazy"
          />
          <h3 className="font-medium text-lg text-center">Market Prices</h3>
          <ul className="mt-2 mb-1">
            {marketPrices.map((item, idx) => (
              <li key={item.crop + idx} className="flex justify-between text-sm">
                <span className="font-bold">{item.crop}</span>
                <span>
                  ₹{item.price} <span className="text-gray-500">{item.unit}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Expert Advice Card */}
        <div className="rounded-2xl glass-morphism p-6 shadow-md bg-white/80 dark:bg-gray-800/80 border backdrop-blur-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3456/3456598.png"
            alt="Expert"
            className="w-14 h-14 mb-3 mx-auto"
            loading="lazy"
          />
          <h3 className="font-medium text-lg text-center">Expert Advice</h3>
          <ul className="mt-2">
            {expertAdvice.map((item, idx) => (
              <li key={idx} className="mb-2 text-sm">
                <span className="font-semibold">{item.expert}:</span> {item.advice}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
