import React, { useState } from 'react';
import { Send, Bot, User, Mic, Paperclip } from 'lucide-react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI travel assistant. How can I help you plan your next adventure?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      content: 'I want to plan a trip to Japan next month',
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      type: 'ai',
      content: 'That sounds exciting! Japan in spring is beautiful. Let me help you with that. What type of experience are you looking for? Cultural sites, nature, modern cities, or a mix of everything?',
      timestamp: '10:31 AM'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      const userMessage = message;
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        let aiReply = 'I\'d be happy to help you with that! Let me find the best options for your travel needs.';
        
        const userMsg = userMessage.toLowerCase();
        if (userMsg.includes('flight') || userMsg.includes('fly')) {
          aiReply = 'I can help you find the perfect flight! What\'s your departure city and destination? I\'ll search for the best deals and flight times for you. You can also check our flights page for real-time availability.';
        } else if (userMsg.includes('hotel') || userMsg.includes('stay') || userMsg.includes('accommodation')) {
          aiReply = 'Looking for accommodation? I can help you find hotels that match your preferences. What city are you visiting and what\'s your budget range? Check out our hotels section for great deals!';
        } else if (userMsg.includes('train')) {
          aiReply = 'Train travel is a great choice! I can help you find train schedules and book tickets. Which route are you planning to take? Visit our trains page for schedules and bookings.';
        } else if (userMsg.includes('car') || userMsg.includes('rent')) {
          aiReply = 'Need a rental car? I can help you find the perfect vehicle for your trip. What type of car are you looking for and where do you need it? Check our cars section for rental options.';
        } else if (userMsg.includes('tokyo') || userMsg.includes('japan')) {
          aiReply = 'Tokyo is an amazing destination! I recommend visiting during spring for cherry blossoms or fall for beautiful colors. Would you like me to help you plan your itinerary and find flights? I can also suggest the best areas to stay in Tokyo.';
        } else if (userMsg.includes('paris') || userMsg.includes('france')) {
          aiReply = 'Paris, the City of Light! Perfect for romance and culture. I can help you find flights, hotels near the Eiffel Tower, and create a perfect itinerary. What\'s your travel date? Don\'t forget to visit the Louvre and Notre-Dame!';
        } else if (userMsg.includes('budget') || userMsg.includes('cheap') || userMsg.includes('affordable')) {
          aiReply = 'I understand you\'re looking for budget-friendly options. I can help you find great deals on flights, affordable hotels, and money-saving travel tips. What\'s your destination? I can suggest budget airlines and hostels too!';
        } else if (userMsg.includes('thank')) {
          aiReply = 'You\'re very welcome! I\'m here to help make your travel planning as smooth as possible. Is there anything else you\'d like to know about your trip? Feel free to ask about destinations, booking tips, or travel advice!';
        } else if (userMsg.includes('hello') || userMsg.includes('hi')) {
          aiReply = 'Hello! I\'m your AI travel assistant. I can help you with flight bookings, hotel recommendations, travel planning, and much more. What would you like to know about today?';
        } else if (userMsg.includes('weather') || userMsg.includes('climate')) {
          aiReply = 'I can help you with weather information for your destination! What city are you planning to visit and when? This will help me give you the best travel advice for that time of year.';
        } else if (userMsg.includes('visa') || userMsg.includes('passport')) {
          aiReply = 'Visa and passport requirements vary by destination. I can help you find information about visa requirements for your trip. Which country are you planning to visit? I\'ll guide you to the right resources.';
        } else {
          aiReply = 'That\'s an interesting question! I\'m here to help with all your travel needs. Could you tell me more about what you\'re looking for? I can assist with flights, hotels, activities, travel tips, and destination recommendations.';
        }
        
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai' as const,
          content: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 800);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/80"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 h-screen flex flex-col">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">AI Travel Assistant</h1>
            <p className="text-white/80">Get instant help with your travel planning</p>
          </div>

          {/* Chat Container */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex-1 flex flex-col max-h-[600px]">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 ${msg.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        msg.type === 'user' 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}>
                        {msg.type === 'user' ? 
                          <User className="h-5 w-5 text-white" /> : 
                          <Bot className="h-5 w-5 text-white" />
                        }
                      </div>
                    </div>
                    <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm'
                          : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-bl-sm'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <span className="text-xs text-white/60 mt-1">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-12"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setMessage('Help me find flights to Tokyo')}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
            >
              Find flights to Tokyo
            </button>
            <button
              onClick={() => setMessage('What are the best hotels in Paris?')}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
            >
              Best hotels in Paris
            </button>
            <button
              onClick={() => setMessage('Plan a 7-day Europe itinerary')}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
            >
              Europe itinerary
            </button>
            <button
              onClick={() => setMessage('What\'s the weather like in Bali?')}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
            >
              Weather in Bali
            </button>
            <button
              onClick={() => setMessage('I need budget travel tips')}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
            >
              Budget tips
            </button>
            <button
              onClick={() => setMessage('Help me rent a car in New York')}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all text-sm"
            >
              Rent a car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;