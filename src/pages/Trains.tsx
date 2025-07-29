import React, { useState } from 'react';
import { Train, MapPin, Calendar, Users, Clock, Star, Wifi, Coffee, Search, CheckCircle } from 'lucide-react';

function Trains() {
  const [showResults, setShowResults] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingStep, setBookingStep] = useState('search');
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrStatus, setPnrStatus] = useState(null);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
    class: 'AC'
  });

  const trains = [
    {
      id: 1,
      name: 'Express Bullet',
      number: 'EXP001',
      from: 'New York',
      to: 'Washington DC',
      departure: '08:00',
      arrival: '11:30',
      duration: '3h 30m',
      price: 89,
      class: 'First Class',
      rating: 4.8,
      amenities: ['WiFi', 'Food Service', 'AC'],
      seats: 'Available: 23'
    },
    {
      id: 2,
      name: 'Metro Line',
      number: 'MTR205',
      from: 'New York',
      to: 'Washington DC',
      departure: '14:15',
      arrival: '18:00',
      duration: '3h 45m',
      price: 65,
      class: 'Second Class',
      rating: 4.5,
      amenities: ['WiFi', 'AC'],
      seats: 'Available: 12'
    },
    {
      id: 3,
      name: 'Night Express',
      number: 'NGT789',
      from: 'New York',
      to: 'Washington DC',
      departure: '22:30',
      arrival: '02:15',
      duration: '3h 45m',
      price: 45,
      class: 'Sleeper',
      rating: 4.3,
      amenities: ['Sleeper Berth', 'AC'],
      seats: 'Available: 8'
    }
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleBookNow = (train) => {
    setSelectedTrain(train);
    setBookingStep('booking');
  };

  const handleConfirmBooking = () => {
    setBookingStep('confirmation');
  };

  const handleCheckPNR = () => {
    if (pnrNumber) {
      setPnrStatus({
        pnr: pnrNumber,
        status: 'Confirmed',
        train: 'Express Bullet (EXP001)',
        seat: 'A1-23',
        class: 'AC First Class'
      });
    }
  };

  if (bookingStep === 'confirmation') {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2513967/pexels-photo-2513967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-blue-900/60"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Train Booked!</h2>
            <p className="text-white/80 mb-6">Your train ticket has been confirmed.</p>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-2">{selectedTrain?.name}</h3>
              <p className="text-white/80">PNR: TRN{Math.random().toString().substr(2, 8)}</p>
              <p className="text-white/80">{selectedTrain?.from} → {selectedTrain?.to}</p>
              <p className="text-cyan-400 font-bold">${selectedTrain?.price}</p>
            </div>
            <button 
              onClick={() => {
                setBookingStep('search');
                setShowResults(false);
                setSelectedTrain(null);
              }}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            >
              Book Another Train
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'booking' && selectedTrain) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2513967/pexels-photo-2513967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-blue-900/60"></div>
        <div className="relative z-10 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Booking</h1>
              <button 
                onClick={() => setBookingStep('search')}
                className="text-green-400 hover:text-green-300"
              >
                ← Back to Trains
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Train Details</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium">{selectedTrain.name}</h4>
                      <p className="text-white/70">Train #{selectedTrain.number}</p>
                      <p className="text-white/70">{selectedTrain.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{selectedTrain.from} → {selectedTrain.to}</p>
                      <p className="text-white/70">{selectedTrain.departure} - {selectedTrain.arrival}</p>
                      <p className="text-green-400">{selectedTrain.seats}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Passenger Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-24">
                  <h3 className="text-xl font-semibold text-white mb-4">Booking Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white/80">
                      <span>Ticket Price</span>
                      <span>${selectedTrain.price}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Service Fee</span>
                      <span>${Math.round(selectedTrain.price * 0.05)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>${selectedTrain.price + Math.round(selectedTrain.price * 0.05)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
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
        backgroundImage: 'url(https://images.pexels.com/photos/2513967/pexels-photo-2513967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-blue-900/60"></div>
      
      {/* Animated Train */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden">
        <div className="animate-pulse">
          <Train className="h-12 w-12 text-white/30 ml-20" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Journey by Rail
            </h1>
            <p className="text-xl text-white/90">
              Comfortable, scenic, and eco-friendly travel
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="From Station"
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="To Station"
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                <select 
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4+ Passengers</option>
                </select>
              </div>
              <div className="relative">
                <Train className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
                <select 
                  value={searchData.class}
                  onChange={(e) => setSearchData({...searchData, class: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
                >
                  <option value="AC">AC First Class</option>
                  <option value="2AC">AC Second Class</option>
                  <option value="3AC">AC Third Class</option>
                  <option value="SL">Sleeper</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            >
              Search Trains
            </button>
          </div>

          {/* PNR Checker */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Check PNR Status</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter PNR Number"
                value={pnrNumber}
                onChange={(e) => setPnrNumber(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button 
                onClick={handleCheckPNR}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300"
              >
                Check Status
              </button>
            </div>
            
            {pnrStatus && (
              <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/20">
                <h4 className="text-white font-semibold mb-2">PNR Status: {pnrStatus.pnr}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/70">Status: </span>
                    <span className="text-green-400 font-semibold">{pnrStatus.status}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Train: </span>
                    <span className="text-white">{pnrStatus.train}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Seat: </span>
                    <span className="text-white">{pnrStatus.seat}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Class: </span>
                    <span className="text-white">{pnrStatus.class}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showResults && (
            <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Available Trains</h2>
            {trains.map((train) => (
              <div key={train.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-full p-3 mr-4">
                        <Train className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{train.name}</h3>
                        <p className="text-white/70">Train #{train.number}</p>
                      </div>
                      <div className="flex items-center ml-4">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-white/80">{train.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-white">{train.departure}</div>
                        <div className="text-white/70">{train.from}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-white/80">{train.duration}</span>
                        </div>
                        <div className="text-sm text-white/70">{train.class}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{train.arrival}</div>
                        <div className="text-white/70">{train.to}</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-green-400 font-medium">{train.seats}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {train.amenities.map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white/80 flex items-center">
                          {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                          {amenity === 'Food Service' && <Coffee className="h-3 w-3 mr-1" />}
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:ml-8 flex flex-col items-end">
                    <div className="text-3xl font-bold text-white mb-2">${train.price}</div>
                    <button 
                      onClick={() => handleBookNow(train)}
                      className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trains;