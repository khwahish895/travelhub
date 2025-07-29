import React, { useState, useEffect } from 'react';
import { Car, MapPin, Calendar, Users, Star, Fuel, Settings, Shield, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Cars() {
  const [showResults, setShowResults] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingStep, setBookingStep] = useState('search');
  const [searchData, setSearchData] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    dropoffDate: '',
    driverAge: '25+'
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBooking();

  // Check if destination was passed from destination detail page
  useEffect(() => {
    if (location.state?.destination) {
      setSearchData(prev => ({
        ...prev,
        pickup: location.state.destination,
        dropoff: location.state.destination
      }));
      setShowResults(true);
    }
  }, [location.state]);

  const cars = [
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'Electric Sedan',
      image: 'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 89,
      rating: 4.9,
      reviews: 234,
      features: ['Electric', 'Autopilot', 'Premium Sound', '5 Seats'],
      transmission: 'Automatic',
      fuel: 'Electric',
      description: 'Experience the future of driving with Tesla Model 3. Advanced autopilot features and premium interior.'
    },
    {
      id: 2,
      name: 'BMW 3 Series',
      type: 'Luxury Sedan',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 125,
      rating: 4.8,
      reviews: 189,
      features: ['Leather Seats', 'Navigation', 'Sunroof', '5 Seats'],
      transmission: 'Automatic',
      fuel: 'Gasoline',
      description: 'Luxury sedan with premium leather interior and advanced navigation system.'
    },
    {
      id: 3,
      name: 'Toyota Camry',
      type: 'Mid-size Sedan',
      image: 'https://images.pexels.com/photos/1319795/pexels-photo-1319795.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 65,
      rating: 4.6,
      reviews: 445,
      features: ['Fuel Efficient', 'Bluetooth', 'Backup Camera', '5 Seats'],
      transmission: 'Automatic',
      fuel: 'Gasoline',
      description: 'Reliable and fuel-efficient sedan perfect for city driving and long trips.'
    },
    {
      id: 4,
      name: 'Ford Mustang',
      type: 'Sports Car',
      image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 150,
      rating: 4.7,
      reviews: 156,
      features: ['V8 Engine', 'Sport Mode', 'Premium Interior', '4 Seats'],
      transmission: 'Manual',
      fuel: 'Gasoline',
      description: 'Iconic American muscle car with powerful V8 engine and sport-tuned suspension.'
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleBookNow = (car) => {
    // Add booking directly
    addBooking({
      type: 'Car',
      title: car.name,
      destination: searchData.pickup || 'Car Rental',
      date: searchData.pickupDate || new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      price: car.price,
      image: car.image
    });
    
    alert(`${car.name} booked successfully! Check your dashboard for details.`);
    navigate('/dashboard');
  };

  const handleProceedToBooking = () => {
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
          backgroundImage: 'url(https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-red-900/60"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Car Booked!</h2>
            <p className="text-white/80 mb-6">Your car rental has been confirmed.</p>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-2">{selectedCar?.name}</h3>
              <p className="text-white/80">Booking ID: CAR{Math.random().toString().substr(2, 8)}</p>
              <p className="text-orange-400 font-bold">${selectedCar?.price}/day</p>
            </div>
            <button 
              onClick={() => {
                setBookingStep('search');
                setShowResults(false);
                setSelectedCar(null);
              }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300"
            >
              Rent Another Car
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'booking' && selectedCar) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-red-900/60"></div>
        <div className="relative z-10 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Booking</h1>
              <button 
                onClick={() => setBookingStep('details')}
                className="text-orange-400 hover:text-orange-300"
              >
                ← Back to Car Details
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Car Details</h3>
                  <div className="flex items-center mb-4">
                    <img src={selectedCar.image} alt={selectedCar.name} className="w-16 h-16 rounded-xl object-cover mr-4" />
                    <div>
                      <h4 className="text-white font-medium">{selectedCar.name}</h4>
                      <p className="text-white/70">{selectedCar.type}</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                        <span className="text-white/80">{selectedCar.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Driver Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      type="text"
                      placeholder="Driver's License Number"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-24">
                  <h3 className="text-xl font-semibold text-white mb-4">Rental Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white/80">
                      <span>Daily Rate</span>
                      <span>${selectedCar.price}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Days</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Insurance</span>
                      <span>${Math.round(selectedCar.price * 0.15)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>${(selectedCar.price * 3) + Math.round(selectedCar.price * 0.15)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
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

  if (bookingStep === 'details' && selectedCar) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-red-900/60"></div>
        <div className="relative z-10 pt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setBookingStep('search')}
                className="text-orange-400 hover:text-orange-300"
              >
                ← Back to Cars
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold">
                  ${selectedCar.price}/day
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedCar.name}</h1>
                    <p className="text-white/80 mb-4">{selectedCar.type}</p>
                    
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-6">
                        <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                        <span className="text-white/80">{selectedCar.rating} ({selectedCar.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center mr-6">
                        <Settings className="h-5 w-5 text-orange-400 mr-1" />
                        <span className="text-white/80">{selectedCar.transmission}</span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="h-5 w-5 text-orange-400 mr-1" />
                        <span className="text-white/80">{selectedCar.fuel}</span>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-6 text-lg">{selectedCar.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedCar.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-white/80">
                            <Shield className="h-4 w-4 mr-2 text-orange-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-24">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-white">${selectedCar.price}</div>
                        <div className="text-white/70">per day</div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-white font-medium mb-2">Pickup Date</label>
                          <input
                            type="datetime-local"
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Return Date</label>
                          <input
                            type="datetime-local"
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleProceedToBooking}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
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
        backgroundImage: 'url(https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-red-900/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Rent Your Perfect Ride
            </h1>
            <p className="text-xl text-white/90">
              From economy to luxury, find the car that suits your journey
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={searchData.pickup}
                  onChange={(e) => setSearchData({...searchData, pickup: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Drop-off Location"
                  value={searchData.dropoff}
                  onChange={(e) => setSearchData({...searchData, dropoff: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <input
                  type="datetime-local"
                  value={searchData.pickupDate}
                  onChange={(e) => setSearchData({...searchData, pickupDate: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <input
                  type="datetime-local"
                  value={searchData.dropoffDate}
                  onChange={(e) => setSearchData({...searchData, dropoffDate: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <select 
                  value={searchData.driverAge}
                  onChange={(e) => setSearchData({...searchData, driverAge: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                >
                  <option value="18-24">18-24 years</option>
                  <option value="25+">25+ years</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300"
            >
              Search Cars
            </button>
          </div>

          {showResults && (
            <div>
            <h2 className="text-2xl font-bold text-white mb-6">Available Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-semibold">
                    ${car.price}/day
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{car.name}</h3>
                      <p className="text-white/70">{car.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white/80">{car.rating}</span>
                      <span className="text-white/60 ml-1">({car.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-1" />
                      {car.fuel}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-white/80">
                        <Shield className="h-3 w-3 mr-2 text-orange-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleBookNow(car)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cars;