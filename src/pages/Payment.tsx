import React, { useState } from 'react';
import { CreditCard, Shield, Lock, Check, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    couponCode: ''
  });

  const navigate = useNavigate();
  const { addBooking, paymentMethods } = useBooking();

  const trip = {
    destination: 'Tokyo, Japan',
    dates: 'March 15-22, 2024',
    travelers: 2,
    flight: 899,
    hotel: 450,
    subtotal: 1349,
    taxes: 135,
    total: 1484
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus('idle');
      
      // Validate form data
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
        alert('Please fill in all required fields');
        setIsProcessing(false);
        return;
      }
      
      // Simulate payment processing
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        
        if (success) {
          setPaymentStatus('success');
          // Add booking to user's bookings
          addBooking({
            type: 'Flight',
            title: 'NYC to Tokyo',
            destination: trip.destination,
            date: '2024-03-15',
            status: 'Confirmed',
            price: trip.total,
            image: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=200'
          });
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setPaymentStatus('error');
        }
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-purple-900/70"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Secure Payment</h1>
            <p className="text-xl text-white/90">Complete your booking with confidence</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                {/* Security Badge */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center bg-green-500/20 rounded-full px-4 py-2 border border-green-400/30">
                    <Shield className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-green-400 font-medium">SSL Secured</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>
                  {paymentMethods.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Saved Cards</h4>
                      <div className="space-y-2">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod('saved')}
                            className={`w-full p-3 rounded-xl border transition-all text-left ${
                              paymentMethod === 'saved'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white'
                                : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-3" />
                              <div>
                                <div className="font-medium">
                                  {method.type === 'card' ? `**** **** **** ${method.last4}` : 'PayPal'}
                                </div>
                                {method.isDefault && <div className="text-sm opacity-80">Default</div>}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white'
                          : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      <CreditCard className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">New Card</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-xl border transition-all ${
                        paymentMethod === 'paypal'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white'
                          : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      <div className="w-6 h-6 mx-auto mb-2 bg-blue-500 rounded"></div>
                      <div className="text-sm font-medium">PayPal</div>
                    </button>
                  </div>
                </div>

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <form className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-10 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">CVV</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full pl-10 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>

                    {/* Coupon Code */}
                    <div>
                      <label className="block text-white font-medium mb-2">Coupon Code (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="couponCode"
                          value={formData.couponCode}
                          onChange={handleInputChange}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        <button
                          type="button"
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Trip Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 sticky top-24">
                <h3 className="text-xl font-semibold text-white mb-6">Trip Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-white font-medium">{trip.destination}</h4>
                    <p className="text-white/70">{trip.dates}</p>
                    <p className="text-white/70">{trip.travelers} travelers</p>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4 space-y-3">
                    <div className="flex justify-between text-white/80">
                      <span>Flight</span>
                      <span>${trip.flight}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Hotel</span>
                      <span>${trip.hotel}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Subtotal</span>
                      <span>${trip.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Taxes & Fees</span>
                      <span>${trip.taxes}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>${trip.total}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center">
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </div>
                </button>

                {paymentStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-green-400 font-medium">Payment successful! Redirecting to dashboard...</span>
                    </div>
                  </div>
                )}

                {paymentStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <span className="text-red-400 font-medium">Payment failed. Please try again.</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="flex items-center justify-center text-green-400 mb-2">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">100% Secure Payment</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;