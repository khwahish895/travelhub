import React, { useState, useEffect } from 'react';
import { Hotel, MapPin, Calendar, Users, Filter, Star, Wifi, Car, Coffee, ArrowLeft, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Hotels() {
  const [showResults, setShowResults] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showHotelDetails, setShowHotelDetails] = useState(false);
  const [bookingStep, setBookingStep] = useState('search');
  const [searchData, setSearchData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    guests: '2'
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBooking();

  // Check if destination was passed from destination detail page
  useEffect(() => {
    if (location.state?.destination) {
      setSearchData(prev => ({
        ...prev,
        destination: location.state.destination
      }));
      setShowResults(true);
    }
  }, [location.state]);

  const hotels = [
    {
      id: 1,
      name: 'Oceanview Resort & Spa',
      location: 'Miami Beach, FL',
      rating: 4.8,
      reviews: 1250,
      price: 299,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Wifi', 'Pool', 'Spa', 'Restaurant'],
      gallery: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      description: 'Luxury oceanfront resort with world-class spa and dining facilities.'
    },
    {
      id: 2,
      name: 'Mountain View Lodge',
      location: 'Aspen, CO',
      rating: 4.9,
      reviews: 890,
      price: 450,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Wifi', 'Fireplace', 'Ski Access', 'Restaurant'],
      gallery: [
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      description: 'Cozy mountain lodge with stunning views and direct ski access.'
    },
    {
      id: 3,
      name: 'City Center Hotel',
      location: 'New York, NY',
      rating: 4.6,
      reviews: 2100,
      price: 189,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      amenities: ['Wifi', 'Gym', 'Business Center', 'Parking'],
      gallery: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      description: 'Modern city hotel in the heart of Manhattan with premium amenities.'
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleBookNow = (hotel) => {
    // Add booking directly
    addBooking({
      type: 'Hotel',
      title: hotel.name,
      destination: hotel.location,
      date: searchData.checkin || new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      price: hotel.price,
      image: hotel.image
    });
    
    alert(`${hotel.name} booked successfully! Check your dashboard for details.`);
    navigate('/dashboard');
  };

  const handleProceedToBooking = () => {
    setShowHotelDetails(false);
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
          backgroundImage: 'url(https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
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
            <h2 className="text-3xl font-bold text-white mb-4">Hotel Booked!</h2>
            <p className="text-white/80 mb-6">Your hotel reservation has been confirmed.</p>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-2">{selectedHotel?.name}</h3>
              <p className="text-white/80">{selectedHotel?.location}</p>
              <p className="text-cyan-400 font-bold">${selectedHotel?.price}/night</p>
            </div>
            <button 
              onClick={() => {
                setBookingStep('search');
                setShowResults(false);
                setShowHotelDetails(false);
                setSelectedHotel(null);
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Book Another Hotel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'booking' && selectedHotel) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-purple-900/60"></div>
        <div className="relative z-10 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Booking</h1>
              <button 
                onClick={() => setBookingStep('search')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                ← Back to Hotels
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Hotel Details</h3>
                  <div className="flex items-center mb-4">
                    <img src={selectedHotel.image} alt={selectedHotel.name} className="w-16 h-16 rounded-xl object-cover mr-4" />
                    <div>
                      <h4 className="text-white font-medium">{selectedHotel.name}</h4>
                      <p className="text-white/70">{selectedHotel.location}</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                        <span className="text-white/80">{selectedHotel.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Guest Information</h3>
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
                      <span>Room Price (per night)</span>
                      <span>${selectedHotel.price}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Nights</span>
                      <span>2</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Taxes & Fees</span>
                      <span>${Math.round(selectedHotel.price * 2 * 0.12)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>${(selectedHotel.price * 2) + Math.round(selectedHotel.price * 2 * 0.12)}</span>
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

  if (showHotelDetails && selectedHotel) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-purple-900/60"></div>
        <div className="relative z-10 pt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setShowHotelDetails(false)}
                className="flex items-center text-cyan-400 hover:text-cyan-300"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Hotels
              </button>
              <button 
                onClick={() => setShowHotelDetails(false)}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20">
              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
                {selectedHotel.gallery.map((image, index) => (
                  <div key={index} className={`relative overflow-hidden rounded-xl ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <img 
                      src={image} 
                      alt={`${selectedHotel.name} ${index + 1}`}
                      className={`w-full object-cover hover:scale-110 transition-transform duration-300 ${index === 0 ? 'h-64 md:h-full' : 'h-32'}`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Hotel Info */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedHotel.name}</h1>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-cyan-400 mr-2" />
                      <span className="text-white/80">{selectedHotel.location}</span>
                      <div className="flex items-center ml-4">
                        <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                        <span className="text-white/80">{selectedHotel.rating} ({selectedHotel.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-6 text-lg">{selectedHotel.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedHotel.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-white/80">
                            {amenity === 'Wifi' && <Wifi className="h-5 w-5 mr-3 text-cyan-400" />}
                            {amenity === 'Pool' && <div className="w-5 h-5 mr-3 bg-cyan-400 rounded-full"></div>}
                            {amenity === 'Spa' && <div className="w-5 h-5 mr-3 bg-pink-400 rounded-full"></div>}
                            {amenity === 'Restaurant' && <Coffee className="h-5 w-5 mr-3 text-cyan-400" />}
                            {amenity === 'Parking' && <Car className="h-5 w-5 mr-3 text-cyan-400" />}
                            {amenity === 'Gym' && <div className="w-5 h-5 mr-3 bg-green-400 rounded-full"></div>}
                            {amenity === 'Business Center' && <div className="w-5 h-5 mr-3 bg-blue-400 rounded-full"></div>}
                            {amenity === 'Fireplace' && <div className="w-5 h-5 mr-3 bg-orange-400 rounded-full"></div>}
                            {amenity === 'Ski Access' && <div className="w-5 h-5 mr-3 bg-purple-400 rounded-full"></div>}
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-24">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-white">${selectedHotel.price}</div>
                        <div className="text-white/70">per night</div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-white font-medium mb-2">Check-in</label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Check-out</label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Guests</label>
                          <select className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none">
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4+ Guests</option>
                          </select>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleProceedToBooking}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
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
        backgroundImage: 'url(https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
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
              Discover Amazing Hotels
            </h1>
            <p className="text-xl text-white/90">
              From luxury resorts to cozy boutique hotels
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.checkin}
                  onChange={(e) => setSearchData({...searchData, checkin: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.checkout}
                  onChange={(e) => setSearchData({...searchData, checkout: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <select 
                  value={searchData.guests}
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Search Hotels
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
                      <input type="range" min="0" max="1000" className="w-full" />
                      <div className="flex justify-between text-sm text-white/70">
                        <span>$0</span>
                        <span>$1000+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Star Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center text-white/80">
                          <input type="checkbox" className="mr-2 rounded" />
                          <div className="flex">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Amenities</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        Free WiFi
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        Pool
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        Spa
                      </label>
                      <label className="flex items-center text-white/80">
                        <input type="checkbox" className="mr-2 rounded" />
                        Restaurant
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-semibold">
                        ${hotel.price}/night
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{hotel.name}</h3>
                      <div className="flex items-center mb-3">
                        <MapPin className="h-4 w-4 text-cyan-400 mr-1" />
                        <span className="text-white/80">{hotel.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-white/80 ml-2">{hotel.rating} ({hotel.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/80">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                        <button 
                          onClick={() => handleBookNow(hotel)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                          Book Now
                        </button>
                      </button>
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

export default Hotels;