import React, { useState } from 'react';
import { User, MapPin, Calendar, Clock, Star, Settings, LogOut, Bookmark, CreditCard, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [showAddCard, setShowAddCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newCardData, setNewCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const { user, updateProfile } = useAuth();
  const { bookings, savedTrips, paymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod, removeSavedTrip } = useBooking();

  // Initialize profile data when user loads
  React.useEffect(() => {
    if (user) {
      try {
        const [firstName, ...lastNameParts] = user.name.split(' ');
        setProfileData({
          firstName: firstName || '',
          lastName: lastNameParts.join(' ') || '',
          email: user.email || '',
          phone: user.phone || ''
        });
      } catch (error) {
        console.error('Error parsing user name:', error);
        setProfileData({
          firstName: user.name || '',
          lastName: '',
          email: user.email || '',
          phone: user.phone || ''
        });
      }
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-purple-900/70"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center border border-white/20">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-white/80">Manage your trips and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-24">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === 'bookings' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    My Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === 'saved' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Bookmark className="h-5 w-5 mr-3" />
                    Saved Trips
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === 'profile' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === 'payments' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Payment Methods
                  </button>
                  <button 
                    onClick={() => {
                      // This will be handled by the navbar logout
                    }}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* My Bookings */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">My Bookings</h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                        <Calendar className="h-16 w-16 text-white/50 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No bookings yet</h3>
                        <p className="text-white/70 mb-4">Start exploring and book your first trip!</p>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all">
                          Start Booking
                        </button>
                      </div>
                    </div>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={booking.image} 
                              alt={booking.title}
                              className="w-16 h-16 rounded-xl object-cover mr-4"
                            />
                            <div>
                              <h3 className="text-xl font-semibold text-white">{booking.title}</h3>
                              <p className="text-white/70">{booking.type}</p>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-4 w-4 text-cyan-400 mr-1" />
                                <span className="text-white/80">{booking.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white mb-2">${booking.price}</div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-500/20 text-green-400' 
                                : booking.status === 'Pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Saved Trips */}
              {activeTab === 'saved' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Saved Trips</h2>
                  {savedTrips.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                        <Bookmark className="h-16 w-16 text-white/50 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No saved trips yet</h3>
                        <p className="text-white/70 mb-4">Save destinations you're interested in for later!</p>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all">
                          Explore Destinations
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedTrips.map((trip) => (
                        <div key={trip.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                          <div className="relative h-32 overflow-hidden">
                            <img 
                              src={trip.image} 
                              alt={trip.destination}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <button
                              onClick={() => removeSavedTrip(trip.id)}
                              className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-white mb-2">{trip.destination}</h3>
                            <p className="text-white/70 text-sm mb-2">{trip.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-white/70">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm">Saved on {trip.savedDate}</span>
                              </div>
                              <span className="text-cyan-400 font-semibold">~${trip.estimatedPrice}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <form className="space-y-6" onSubmit={(e) => {
                      e.preventDefault();
                      if (isEditingProfile) {
                        updateProfile({
                          name: `${profileData.firstName} ${profileData.lastName}`.trim(),
                          email: profileData.email,
                          phone: profileData.phone
                        });
                        setIsEditingProfile(false);
                      }
                    }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-medium mb-2">First Name</label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            disabled={!isEditingProfile}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">Last Name</label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            disabled={!isEditingProfile}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
                        />
                      </div>
                      {isEditingProfile && (
                        <button 
                          type="submit"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                        >
                          Update Profile
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    {paymentMethods.length === 0 ? (
                      <div className="text-center py-8">
                        <CreditCard className="h-16 w-16 text-white/50 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No payment methods</h3>
                        <p className="text-white/70 mb-4">Add a payment method to make booking easier</p>
                        <button
                          onClick={() => setShowAddCard(true)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                        >
                          Add Payment Method
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="bg-white/10 rounded-xl p-4 border border-white/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CreditCard className="h-8 w-8 text-cyan-400 mr-3" />
                                <div>
                                  <p className="text-white font-medium">
                                    {method.type === 'card' ? `**** **** **** ${method.last4}` : 'PayPal'}
                                  </p>
                                  {method.type === 'card' && (
                                    <p className="text-white/70">Expires {method.expiryDate}</p>
                                  )}
                                  {method.isDefault && (
                                    <span className="text-cyan-400 text-sm">Default</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {!method.isDefault && (
                                  <button
                                    onClick={() => setDefaultPaymentMethod(method.id)}
                                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                                  >
                                    Set Default
                                  </button>
                                )}
                                <button
                                  onClick={() => removePaymentMethod(method.id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setShowAddCard(true)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add New Card
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Add Card Modal */}
                  {showAddCard && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-white mb-4">Add New Card</h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          try {
                            addPaymentMethod({
                              type: 'card',
                              last4: newCardData.cardNumber.slice(-4),
                              expiryDate: newCardData.expiryDate,
                              cardName: newCardData.cardName,
                              isDefault: paymentMethods.length === 0
                            });
                            setNewCardData({ cardNumber: '', expiryDate: '', cvv: '', cardName: '' });
                            setShowAddCard(false);
                          } catch (error) {
                            console.error('Error adding payment method:', error);
                            alert('Failed to add payment method. Please try again.');
                          }
                        }}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-white font-medium mb-2">Card Number</label>
                              <input
                                type="text"
                                value={newCardData.cardNumber}
                                onChange={(e) => setNewCardData({...newCardData, cardNumber: e.target.value})}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-white font-medium mb-2">Expiry Date</label>
                                <input
                                  type="text"
                                  value={newCardData.expiryDate}
                                  onChange={(e) => setNewCardData({...newCardData, expiryDate: e.target.value})}
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-white font-medium mb-2">CVV</label>
                                <input
                                  type="text"
                                  value={newCardData.cvv}
                                  onChange={(e) => setNewCardData({...newCardData, cvv: e.target.value})}
                                  placeholder="123"
                                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-white font-medium mb-2">Cardholder Name</label>
                              <input
                                type="text"
                                value={newCardData.cardName}
                                onChange={(e) => setNewCardData({...newCardData, cardName: e.target.value})}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex space-x-4 mt-6">
                            <button
                              type="button"
                              onClick={() => setShowAddCard(false)}
                              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/20 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                            >
                              Add Card
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;