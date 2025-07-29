import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, Heart, Share2, ArrowLeft, Plane, Hotel, Car, Train } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

function DestinationDetail() {
  const { destination } = useParams();
  const navigate = useNavigate();
  const { addSavedTrip, addBooking } = useBooking();
  const [isSaved, setIsSaved] = useState(false);

  // Mock destination data - in a real app, this would come from an API
  const destinationData = {
    name: destination || 'Tokyo, Japan',
    country: 'Japan',
    description: 'A fascinating blend of ultramodern and traditional, Tokyo offers a unique travel experience. From the neon-lit streets of Shibuya to the serene temples of Asakusa, this city has something for everyone.',
    image: 'https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 2847,
    bestTime: 'March-May, September-November',
    currency: 'Japanese Yen (¥)',
    language: 'Japanese',
    timezone: 'JST (UTC+9)',
    highlights: [
      'Shibuya Crossing - World\'s busiest pedestrian crossing',
      'Senso-ji Temple - Tokyo\'s oldest temple',
      'Tokyo Skytree - Tallest tower in Japan',
      'Tsukiji Outer Market - Famous fish market',
      'Harajuku - Fashion and youth culture district',
      'Meiji Shrine - Peaceful shrine in the heart of the city'
    ],
    activities: [
      {
        name: 'City Tour',
        duration: '8 hours',
        price: 89,
        image: 'https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Food Tasting',
        duration: '3 hours',
        price: 45,
        image: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Temple Visit',
        duration: '4 hours',
        price: 32,
        image: 'https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    accommodations: [
      {
        name: 'Tokyo Grand Hotel',
        type: 'Luxury',
        price: 250,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Sakura Hostel',
        type: 'Budget',
        price: 45,
        rating: 4.2,
        image: 'https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  };

  const handleSaveTrip = () => {
    addSavedTrip({
      destination: destinationData.name,
      image: destinationData.image,
      description: destinationData.description,
      estimatedPrice: 1200
    });
    setIsSaved(true);
  };

  const handleBookNow = () => {
    // Add booking directly
    addBooking({
      type: 'Flight',
      title: `Flight to ${destinationData.name}`,
      destination: destinationData.name,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      price: 899,
      image: destinationData.image
    });
    
    // Show success message and redirect
    alert('Booking successful! Check your dashboard for details.');
    navigate('/dashboard');
  };

  const handleViewDetails = () => {
    // Navigate to a detailed view page or show modal
    alert(`Detailed information for ${destinationData.name}:\n\n${destinationData.description}\n\nHighlights:\n${destinationData.highlights.join('\n')}`);
  };

  const handleFindHotels = () => {
    navigate('/hotels', { state: { destination: destinationData.name } });
  };

  const handleRentCar = () => {
    navigate('/cars', { state: { destination: destinationData.name } });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${destinationData.image})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-white hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Search
          </button>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {destinationData.name}
                </h1>
                <div className="flex items-center text-white/90 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{destinationData.country}</span>
                  <div className="flex items-center ml-6">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span>{destinationData.rating}</span>
                    <span className="ml-1">({destinationData.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveTrip}
                  className={`p-3 rounded-full border transition-all ${
                    isSaved 
                      ? 'bg-red-500 border-red-500 text-white' 
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <p className="text-xl text-white/90 max-w-4xl leading-relaxed">
              {destinationData.description}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <Calendar className="h-8 w-8 text-cyan-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Best Time</h3>
              <p className="text-white/80 text-sm">{destinationData.bestTime}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <Users className="h-8 w-8 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Language</h3>
              <p className="text-white/80 text-sm">{destinationData.language}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <MapPin className="h-8 w-8 text-pink-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Currency</h3>
              <p className="text-white/80 text-sm">{destinationData.currency}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <Star className="h-8 w-8 text-yellow-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Timezone</h3>
              <p className="text-white/80 text-sm">{destinationData.timezone}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destinationData.highlights.map((highlight, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span className="text-white">{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Popular Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinationData.activities.map((activity, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{activity.name}</h3>
                    <p className="text-white/70 text-sm mb-3">{activity.duration}</p>
                                         <div className="flex items-center justify-between">
                       <span className="text-cyan-400 font-bold">${activity.price}</span>
                       <button 
                         onClick={() => {
                           addBooking({
                             type: 'Flight',
                             title: activity.name,
                             destination: destinationData.name,
                             date: new Date().toISOString().split('T')[0],
                             status: 'Confirmed',
                             price: activity.price,
                             image: activity.image
                           });
                           alert(`${activity.name} booked successfully!`);
                         }}
                         className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-cyan-600 hover:to-blue-700 transition-all"
                       >
                         Book Now
                       </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accommodations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Where to Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinationData.accommodations.map((hotel, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{hotel.name}</h3>
                      <span className="text-cyan-400 text-sm">{hotel.type}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white/80 text-sm">{hotel.rating}</span>
                    </div>
                                         <div className="flex items-center justify-between">
                       <span className="text-cyan-400 font-bold">${hotel.price}/night</span>
                       <button 
                         onClick={() => {
                           addBooking({
                             type: 'Hotel',
                             title: hotel.name,
                             destination: destinationData.name,
                             date: new Date().toISOString().split('T')[0],
                             status: 'Confirmed',
                             price: hotel.price,
                             image: hotel.image
                           });
                           alert(`${hotel.name} booked successfully!`);
                         }}
                         className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-cyan-600 hover:to-blue-700 transition-all"
                       >
                         Book Now
                       </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore {destinationData.name}?</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Start planning your perfect trip with our comprehensive travel services. 
                From flights to accommodations, we've got everything you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                 <button
                   onClick={handleBookNow}
                   className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                 >
                   <Plane className="h-5 w-5 mr-2" />
                   Book Flights
                 </button>
                 <button 
                   onClick={handleFindHotels}
                   className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                 >
                   <Hotel className="h-5 w-5 mr-2" />
                   Find Hotels
                 </button>
                 <button 
                   onClick={handleRentCar}
                   className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                 >
                   <Car className="h-5 w-5 mr-2" />
                   Rent a Car
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetail; 