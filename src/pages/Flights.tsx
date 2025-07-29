import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, Filter, Clock, Star, ArrowRight, Wifi, Coffee, Tv } from 'lucide-react';

function Flights() {
  const [showResults, setShowResults] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingStep, setBookingStep] = useState('search'); // search, results, booking, confirmation
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1'
  });

  const flights = [
    {
      id: 1,
      airline: 'SkyWings Airlines',
      logo: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=100',
      from: 'NYC',
      to: 'LAX',
      departure: '08:30',
      arrival: '11:45',
      duration: '5h 15m',
      price: 299,
      stops: 'Non-stop',
      rating: 4.8,
      class: 'Economy',
      amenities: ['WiFi', 'Entertainment', 'Meals'],
      aircraft: 'Boeing 737'
    },
    {
      id: 2,
      airline: 'AeroJet Airways',
      logo: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=100',
      from: 'NYC',
      to: 'LAX',
      departure: '14:20',
      arrival: '17:55',
      duration: '5h 35m',
      price: 245,
      stops: '1 stop',
      rating: 4.6,
      class: 'Economy',
      amenities: ['WiFi', 'Snacks'],
      aircraft: 'Airbus A320'
    },
    {
      id: 3,
      airline: 'CloudFly Express',
      logo: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=100',
      from: 'NYC',
      to: 'LAX',
      departure: '19:10',
      arrival: '22:30',
      duration: '5h 20m',
      price: 189,
      stops: 'Non-stop',
      rating: 4.7,
      class: 'Economy',
      amenities: ['WiFi', 'Entertainment'],
      aircraft: 'Boeing 787'
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
    setBookingStep('results');
  };

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
    setBookingStep('booking');
  };

  const handleConfirmBooking = () => {
    setBookingStep('confirmation');
  };

  if (bookingStep === 'confirmation') {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-purple-900/60"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-white/80 mb-6">Your flight has been successfully booked.</p>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-2">{selectedFlight?.airline}</h3>
              <p className="text-white/80">{selectedFlight?.from} → {selectedFlight?.to}</p>
              <p className="text-white/80">{selectedFlight?.departure} - {selectedFlight?.arrival}</p>
              <p className="text-cyan-400 font-bold">${selectedFlight?.price}</p>
            </div>
            <button 
              onClick={() => setBookingStep('search')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Book Another Flight
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'booking' && selectedFlight) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-purple-900/60"></div>
        <div className="relative z-10 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Booking</h1>
              <button 
                onClick={() => setBookingStep('results')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                ← Back to Results
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Flight Details</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium">{selectedFlight.airline}</h4>
                      <p className="text-white/70">{selectedFlight.aircraft}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{selectedFlight.from} → {selectedFlight.to}</p>
                      <p className="text-white/70">{selectedFlight.departure} - {selectedFlight.arrival}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedFlight.amenities.map((amenity, index) => (
                      <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/80 flex items-center">
                        {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                        {amenity === 'Entertainment' && <Tv className="h-3 w-3 mr-1" />}
                        {amenity === 'Meals' && <Coffee className="h-3 w-3 mr-1" />}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Passenger Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-24">
                  <h3 className="text-xl font-semibold text-white mb-4">Booking Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white/80">
                      <span>Flight Price</span>
                      <span>${selectedFlight.price}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Taxes & Fees</span>
                      <span>${Math.round(selectedFlight.price * 0.15)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>${selectedFlight.price + Math.round(selectedFlight.price * 0.15)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-purple-900/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl text-white/90">
              Compare prices and book the best deals
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="From"
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="To"
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.departure}
                  onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="date"
                  placeholder="Return"
                  value={searchData.return}
                  onChange={(e) => setSearchData({...searchData, return: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <select 
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4+ Passengers</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Search Flights
            </button>
          </div>

          {showResults && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-24">
                <div className="flex items-center mb-6">
                  <Filter className="h-5 w-5 text-cyan-400 mr-2" />
                  <h3 className="text-xl font-semibold text-white">Filters</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <input type="range" min="0" max="500" className="w-full" />
                      <div className="flex justify-between text-sm text-white/70">
                        <span>$0</span>
                        <span>$500+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Stops</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        Non-stop
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        1 stop
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        2+ stops
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Airlines</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        SkyWings
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        AeroJet
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        CloudFly
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Results */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
                            <Plane className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white">{flight.airline}</h3>
                            <p className="text-white/70">{flight.aircraft}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                            <span className="text-white/80">{flight.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-2xl font-bold text-white">{flight.departure}</div>
                            <div className="text-white/70">{flight.from}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="h-4 w-4 text-cyan-400 mr-1" />
                              <span className="text-white/80">{flight.duration}</span>
                            </div>
                            <div className="flex items-center justify-center">
                              <ArrowRight className="h-4 w-4 text-cyan-400" />
                            </div>
                            <div className="text-sm text-white/70 mt-1">{flight.stops}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{flight.arrival}</div>
                            <div className="text-white/70">{flight.to}</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {flight.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/80 flex items-center">
                              {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                              {amenity === 'Entertainment' && <Tv className="h-3 w-3 mr-1" />}
                              {amenity === 'Meals' && <Coffee className="h-3 w-3 mr-1" />}
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:ml-8 flex flex-col items-end">
                        <div className="text-3xl font-bold text-white mb-2">${flight.price}</div>
                        <div className="text-sm text-white/70 mb-3">{flight.class}</div>
                        <button 
                          onClick={() => handleBookNow(flight)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flights;