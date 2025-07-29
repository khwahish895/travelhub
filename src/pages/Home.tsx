import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Hotel, Train, Car, Calendar, MapPin, Users, Search, Star } from 'lucide-react';

function Home() {
  const [activeTab, setActiveTab] = useState('flights');
  const [showDestinations, setShowDestinations] = useState(false);

  const categories = [
    { id: 'flights', icon: Plane, label: 'Flights', path: '/flights' },
    { id: 'hotels', icon: Hotel, label: 'Hotels', path: '/hotels' },
    { id: 'trains', icon: Train, label: 'Trains', path: '/trains' },
    { id: 'cars', icon: Car, label: 'Cars', path: '/cars' },
  ];

  const popularDestinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'City of Light and Romance',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Modern metropolis meets tradition',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tropical paradise with culture',
      rating: 4.7
    },
    {
      id: 4,
      name: 'New York, USA',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'The city that never sleeps',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Dubai, UAE',
      image: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Luxury and innovation combined',
      rating: 4.8
    },
    {
      id: 6,
      name: 'London, UK',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Historic charm meets modern culture',
      rating: 4.7
    }
  ];

  const handleStartJourney = () => {
    setShowDestinations(true);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-purple-900/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {!showDestinations ? (
            <>
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Discover.
                  </span>{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Book.
                  </span>{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Explore.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Your journey begins with a single search. Discover amazing destinations, 
                  book seamlessly, and explore the world like never before.
                </p>
              </div>

              {/* Category Tabs */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.id}
                          to={category.path}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                            activeTab === category.id
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-105'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                          onClick={() => setActiveTab(category.id)}
                        >
                          <Icon className="h-6 w-6 mb-2" />
                          <span className="text-sm font-medium">{category.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Search Form */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="From"
                        className="w-full pl-10 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="To"
                        className="w-full pl-10 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                      <select className="w-full pl-10 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all appearance-none">
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4+ Passengers</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleStartJourney}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
                  >
                    <Search className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start Your Journey
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Popular Destinations */
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Popular Destinations
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Discover amazing places around the world
                </p>
                <button
                  onClick={() => setShowDestinations(false)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-all"
                >
                  ← Back to Search
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularDestinations.map((destination) => (
                  <div key={destination.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-white font-semibold">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{destination.name}</h3>
                      <p className="text-white/70 mb-4">{destination.description}</p>
                      <Link 
                        to={`/destination/${encodeURIComponent(destination.name)}`}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 inline-block text-center"
                      >
                        Explore Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floating Travel Icons */}
          <div className="absolute top-1/4 left-10 animate-bounce">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
              <Plane className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          <div className="absolute top-1/3 right-10 animate-bounce delay-1000">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
              <Hotel className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="absolute bottom-1/4 left-20 animate-bounce delay-500">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
              <Car className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;