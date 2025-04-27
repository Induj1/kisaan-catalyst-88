import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageLayout from '@/components/PageLayout';
import LocationAccessPopup from '@/components/LocationAccessPopup';
import SensorDataWidget from '@/components/SensorDataWidget';
import DeviceConnectionDialog from '@/components/DeviceConnectionDialog';
import { 
  Cloud, 
  Tractor, 
  BarChart4, 
  Lightbulb, 
  ShoppingCart, 
  Droplets, 
  Calendar, 
  SlidersHorizontal, 
  Wifi,
  TrendingUp,
  Thermometer,
  AlertTriangle,
  Leaf,
  Activity
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, isNewUser, setIsNewUser } = useAuth();
  const { translate } = useLanguage();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showDeviceDialog, setShowDeviceDialog] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy"
  });
  const [alertsData, setAlertsData] = useState([
    { id: 1, type: "Weather", message: "Heavy rain expected tomorrow", severity: "medium" },
    { id: 2, type: "Soil", message: "Low moisture in Field 2", severity: "high" },
    { id: 3, type: "Market", message: "Wheat prices increased by 5%", severity: "low" }
  ]);
  const [tasksData, setTasksData] = useState([
    { id: 1, title: "Irrigate North Field", dueDate: "Today", status: "pending" },
    { id: 2, title: "Apply fertilizer to crops", dueDate: "Tomorrow", status: "pending" },
    { id: 3, title: "Inspect irrigation system", dueDate: "3 days", status: "completed" }
  ]);
  const [marketPrices, setMarketPrices] = useState([
    { crop: "Wheat", price: 2100, change: "+3.5%" },
    { crop: "Rice", price: 2600, change: "+1.2%" },
    { crop: "Corn", price: 1850, change: "-0.8%" }
  ]);

  useEffect(() => {
    const storedLat = localStorage.getItem('userLatitude');
    const storedLng = localStorage.getItem('userLongitude');
    
    if (storedLat && storedLng) {
      setLatitude(parseFloat(storedLat));
      setLongitude(parseFloat(storedLng));
      setLocationGranted(true);
    } else if (!locationGranted && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationGranted(true);
          
          localStorage.setItem('userLatitude', position.coords.latitude.toString());
          localStorage.setItem('userLongitude', position.coords.longitude.toString());
        },
        (error) => {
          console.log("Geolocation error or permission denied:", error);
        }
      );
    }
    
    if (isNewUser) {
      setShowLocationPopup(true);
      setIsNewUser(false);
    }
  }, [isNewUser, setIsNewUser, locationGranted]);

  const handleLocationGranted = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationGranted(true);
    
    localStorage.setItem('userLatitude', lat.toString());
    localStorage.setItem('userLongitude', lng.toString());
  };

  const featureItems = [
    {
      icon: Cloud,
      title: translate('weather'),
      description: translate('checkForecasts'),
      route: '/weather',
      color: 'bg-blue-500',
    },
    {
      icon: Tractor,
      title: translate('farmPlanner'),
      description: translate('planFarmActivities'),
      route: '/farm-planner',
      color: 'bg-green-500',
    },
    {
      icon: BarChart4,
      title: translate('marketPrices'),
      description: translate('checkCropPrices'),
      route: '/market-prices',
      color: 'bg-amber-500',
    },
    {
      icon: ShoppingCart,
      title: translate('marketplace'),
      description: translate('buyAndSellProducts'),
      route: '/marketplace',
      color: 'bg-purple-500',
    },
    {
      icon: Droplets,
      title: translate('loans'),
      description: translate('applyForLoans'),
      route: '/loans',
      color: 'bg-teal-500',
    },
    {
      icon: Lightbulb,
      title: translate('askExpert'),
      description: translate('getAIAdvice'),
      route: '/ask-expert',
      color: 'bg-orange-500',
    },
    {
      icon: Calendar,
      title: translate('cropCalendar'),
      description: translate('seasonalPlanting'),
      route: '/crop-calendar',
      color: 'bg-indigo-500',
    },
    {
      icon: SlidersHorizontal,
      title: translate('settings'),
      description: translate('managePreferences'),
      route: '/settings',
      color: 'bg-gray-500',
    },
    {
      icon: Leaf,
      title: translate('cropAnalysis'),
      description: translate('analyzeYourCrops'),
      route: '/crop-analysis',
      color: 'bg-lime-500',
    },
  ];

  const renderAlertIcon = (severity: string) => {
    switch(severity) {
      case 'high':
        return <AlertTriangle className="text-red-500" size={18} />;
      case 'medium':
        return <AlertTriangle className="text-amber-500" size={18} />;
      case 'low':
        return <AlertTriangle className="text-blue-500" size={18} />;
      default:
        return <AlertTriangle className="text-gray-500" size={18} />;
    }
  };

  const getTaskStatusStyle = (status: string) => {
    switch(status) {
      case 'completed':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {translate('welcome')}, {user?.email?.split('@')[0] || 'Farmer'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {translate('personalizedAssistant')}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowDeviceDialog(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Wifi size={18} />
              Connect Device
            </Button>
            <Button 
              asChild
              className="bg-primary hover:bg-primary-dark"
            >
              <Link to="/farm-planner">
                <Tractor className="mr-2" size={18} />
                Plan Farm
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-sm border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Temperature</p>
                      <h3 className="text-2xl font-bold mt-1">{weatherData.temperature}°C</h3>
                      <p className="text-xs text-blue-600">{weatherData.condition}</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <Thermometer className="text-blue-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Soil Moisture</p>
                      <h3 className="text-2xl font-bold mt-1">62%</h3>
                      <p className="text-xs text-green-600">Optimal</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                      <Droplets className="text-green-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Crop Health</p>
                      <h3 className="text-2xl font-bold mt-1">Good</h3>
                      <p className="text-xs text-amber-600">Review 2 warnings</p>
                    </div>
                    <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <Leaf className="text-amber-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Market Trends</p>
                      <h3 className="text-2xl font-bold mt-1">+2.4%</h3>
                      <p className="text-xs text-purple-600">Above average</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <TrendingUp className="text-purple-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Important notifications for your farm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertsData.map(alert => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        {renderAlertIcon(alert.severity)}
                        <div>
                          <p className="font-medium text-sm">{alert.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Your scheduled farm activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasksData.map(task => (
                      <div key={task.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                          <div>
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Due: {task.dueDate}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTaskStatusStyle(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle>Market Prices</CardTitle>
                  <CardDescription>Latest crop rates in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Crop</TableHead>
                        <TableHead>Price (₹)</TableHead>
                        <TableHead>Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketPrices.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.crop}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                            {item.change}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Farm Health Overview</CardTitle>
                  <CardDescription>Real-time sensor data from your fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <SensorDataWidget />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Analytics</CardTitle>
                <CardDescription>Detailed analysis of your farm performance</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <Activity size={48} className="text-primary mx-auto mb-4 opacity-40" />
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mt-2">
                    View detailed analytics about your farm performance, crop yields, resource usage, and financial metrics.
                  </p>
                  <Button className="mt-4">View Full Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Connected Devices</CardTitle>
                    <CardDescription>Manage your IoT sensors and devices</CardDescription>
                  </div>
                  <Button onClick={() => setShowDeviceDialog(true)} variant="outline" size="sm">
                    <Wifi className="mr-2" size={16} />
                    Add Device
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border border-green-200 dark:border-green-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Soil Moisture Sensor</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Field 1 - North</p>
                          <div className="flex items-center mt-2">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            <span className="text-xs text-green-600">Connected</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">62%</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Last update: 5m ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-amber-200 dark:border-amber-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Temperature Sensor</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Greenhouse</p>
                          <div className="flex items-center mt-2">
                            <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                            <span className="text-xs text-amber-600">Warning</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">32°C</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Last update: 2m ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Irrigation Controller</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Field 2 - South</p>
                          <div className="flex items-center mt-2">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                            <span className="text-xs text-blue-600">Operational</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Auto Mode</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Next watering: Today 6PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <h2 className="text-2xl font-bold mb-6">{translate('features')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featureItems.map((item, index) => (
            <Link to={item.route} key={index} className="transition-transform hover:scale-102 hover:shadow-md">
              <Card className="h-full hover:shadow-md transition-shadow duration-300 border-t-4" style={{ borderTopColor: item.color }}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} mb-4`}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <LocationAccessPopup 
        open={showLocationPopup} 
        onOpenChange={setShowLocationPopup}
        onLocationGranted={handleLocationGranted}
      />

      <DeviceConnectionDialog
        open={showDeviceDialog}
        onOpenChange={setShowDeviceDialog}
      />
    </PageLayout>
  );
};

export default Dashboard;
